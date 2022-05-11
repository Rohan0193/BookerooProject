package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.awt.print.Book;
import java.util.Collection;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;

//controller api
@RestController
@CrossOrigin("*")
// path of api
@RequestMapping(path = "api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    //instantiate a user object to invoke methods
    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    //register api
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/register")
    public ResponseEntity<User> register() {
        return new ResponseEntity(HttpStatus.OK);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    //login api
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        String authenticationException = "Something went wrong.";
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
        } catch (Exception e){
            authenticationException += String.format("\nException cause: %s", e);
        }

        return new ResponseEntity<String>(authenticationException, HttpStatus.BAD_REQUEST);
    }
    //get all users from database
    @GetMapping
    public ResponseEntity<User> getAllUsers(){
        return new ResponseEntity(userService.findAllUsers(), HttpStatus.OK);
    }
    //get a user by username
    @GetMapping(path = "{username}")
    public ResponseEntity<Book> findbyId(@PathVariable("username") String username) {
        return new ResponseEntity(userService.findUserByUsername(username),HttpStatus.OK);
    }

    // Updates the user by id
    @PutMapping("updateUser/{id}")
    public void updateUser(@PathVariable long id, @RequestBody User user) {
        userService.updateUser(id, user);
    }

    // enables the user by username
    @PutMapping(path = "/enableuser/{username}")
    public ResponseEntity<?> enableUser(@PathVariable("username") String username){
        userService.enableUser(username);
        return new ResponseEntity(HttpStatus.OK);
    }

    // deletes the user by username
    @DeleteMapping(path = "/deleteuser/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username){
        userService.deleteUser(username);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/getallnotapprovedusers")
    public ResponseEntity<Collection<User>> getAllNotApprovedUsers(){
        return new ResponseEntity(userService.getAllUnabledUsers(),HttpStatus.OK);
    }
}
