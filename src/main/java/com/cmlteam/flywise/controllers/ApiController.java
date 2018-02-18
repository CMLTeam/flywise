package com.cmlteam.flywise.controllers;

import com.cmlteam.flywise.model.LoginRequest;
import com.cmlteam.flywise.model.ResultStatus;
import com.cmlteam.flywise.model.User;
import com.cmlteam.flywise.services.AppSecurityService;
import com.cmlteam.flywise.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

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
    public User login(@RequestBody LoginRequest loginRequest) {
        appSecurityService.login(loginRequest.getLogin(), loginRequest.getPassword());
        return appSecurityService.getCurrentUser();
    }

    @RequestMapping(value = "logout", method = POST)
    public ResultStatus logout(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        appSecurityService.logout(request, response);
        return ResultStatus.SUCCESS;
    }

    @RequestMapping(value = "user", method = GET)
    public List<User> listUsers() {
        return userService.listUsers();
    }

    @RequestMapping(value = "user/{id}", method = GET)
    public User loadUser(@PathVariable long id) {
        return userService.loadUser(id);
    }

    @RequestMapping(value = "user/{id}", method = DELETE)
    public ResultStatus deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResultStatus.SUCCESS;
    }

    @RequestMapping(value = "user", method = POST)
    public User saveUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @RequestMapping(value = "currentUser", method = GET)
    public User getCurrentUser() {
        return appSecurityService.getCurrentUser();
    }
}
