package com.cmlteam.flywise.controllers;

import com.cmlteam.flywise.model.LoginRequest;
import com.cmlteam.flywise.model.ResultStatus;
import com.cmlteam.flywise.model.User;
import com.cmlteam.flywise.services.AppSecurityService;
import com.cmlteam.flywise.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final UserService userService;
    private final AppSecurityService appSecurityService;

    @Autowired
    public ApiController(UserService userService, AppSecurityService appSecurityService) {
        this.userService = userService;
        this.appSecurityService = appSecurityService;
    }

    @RequestMapping(value = "login", method = POST)
    public ResultStatus login(@RequestBody LoginRequest loginRequest) {

        try {
            appSecurityService.login(loginRequest.getLogin(), loginRequest.getPassword());
            return ResultStatus.SUCCESS;
        } catch (BadCredentialsException e) {
            return ResultStatus.error(e.getMessage());
        }
    }

    @RequestMapping(value = "user", method = GET)
    public List<User> listUsers() {
        return userService.listUsers();
    }

    @RequestMapping(value = "user/{id}", method = GET)
    public User loadUser(@PathVariable long id) {
        return userService.loadUser(id);
    }

    @RequestMapping(value = "user", method = POST)
    public ResultStatus saveUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResultStatus.SUCCESS;
    }

    @RequestMapping(value = "currentUser", method = GET)
    public User getCurrentUser() {
        return appSecurityService.getCurrentUser();
    }
}
