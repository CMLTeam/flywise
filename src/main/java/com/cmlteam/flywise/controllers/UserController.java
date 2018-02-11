package com.cmlteam.flywise.controllers;

import com.cmlteam.flywise.model.User;
import com.cmlteam.flywise.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "", method = GET)
    public List<User> users() {
        return userService.listUsers();
    }

    @RequestMapping(value = "{id}", method = GET)
    public User load(@PathVariable long id) {
        return userService.loadUser(id);
    }

    @RequestMapping(value = "", method = POST)
    public void load(User user) {
        userService.saveUser(user);
    }
}
