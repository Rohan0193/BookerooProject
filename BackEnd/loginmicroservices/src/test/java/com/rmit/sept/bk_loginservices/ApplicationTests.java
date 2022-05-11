package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest
class ApplicationTests {

    //create a user object
    public User user;

    //create a controller object
    @Autowired
    UserService userService;
    @Autowired
    UserController userController;


    //test to check if the controller is not null and is working
    @Test
    void contextLoads() throws Exception{

        assertThat(userService).isNotNull();
    }


}
