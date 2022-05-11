package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;

//a service class to implement methods from user repository
@Service
public class UserService {

    //instantiate an object
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //save user method
    public User saveUser (User newUser){

        User user = null;
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setConfirmPassword("");
            if (newUser.getAccountType().equals("basic")){
                newUser.setEnabled(true);
            }
            user = userRepository.save(newUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException(String.format("Username %s already exists", newUser.getUsername()));
        }

        return  user;
    }

    //find user by username method
    public User findUserByUsername(String username){
        User user = null;
        try {
            user = userRepository.findUserByUsername(username);
        } catch (Exception e){
            throw new RuntimeException("Cant find user with that username");
        }
        return user;
    }

    //get all users from database
    public Collection<User> findAllUsers(){
        Collection<User> allUsers = null;
        try {
            allUsers = (Collection<User>) userRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(String.format("Error occurred when finding all users - %s", e.toString()));
        }
        return allUsers;
    }

    // Replaces the user in the data base with a new user
    public void updateUser(long id, User user) {
        try {
            user.setEnabled(true);
            user.setId(id);
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException(String.format("Failed to update user with id %d - %s", id,e.toString()));
        }
    }

    // Enables the user in the database
    public void enableUser(String username){
        try {
            User user = userRepository.findUserByUsername(username);
            user.setEnabled(true);
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException(String.format("Failed to enable an account - %s", e.toString()));
        }

    }

    // Deletes the user form the database
    public void deleteUser(String username){
        try {
            User user = userRepository.findUserByUsername(username);
            userRepository.delete(user);
        } catch (Exception e) {
            throw new RuntimeException(String.format("Failed to delete an account - %s", e.toString()));
        }

    }

    // Gets all unabled users from the database
    public Collection<User> getAllUnabledUsers(){
        Collection<User> user = null;
        try {
            user = userRepository.findAllByEnabled(false);
        } catch (Exception e) {
            throw new RuntimeException(String.format("Failed get all unenabled accounts - %s", e.toString()));
        }
        return user;
    }
}
