package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

//a repository that extends crud repository to create service implementation
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findUserByUsername(String username);
    User findUserById(Long id);
    Collection findAllByEnabled(boolean value);
    
}
