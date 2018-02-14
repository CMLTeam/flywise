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
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final UserService userService;
    private final AppSecurityService appSecurityService;
    //    @Qualifier("authenticationManager")
    private  final AuthenticationManager authenticationManager;

    @Autowired
    public ApiController(UserService userService, AppSecurityService appSecurityService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.appSecurityService = appSecurityService;
        this.authenticationManager = authenticationManager;
    }

    /*@RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public LoginStatus getStatus() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && !auth.getName().equals("anonymousUser") && auth.isAuthenticated()) {
            return new LoginStatus(true, auth.getName());
        } else {
            return new LoginStatus(false, null);
        }
    }*/

    @RequestMapping(value = "login", method = POST)
    public ResultStatus login(@RequestBody LoginRequest loginRequest) {

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                loginRequest.getLogin(), loginRequest.getPassword());

//        User details = new User(username);
//        token.setDetails(details);

        try {
            Authentication auth = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
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
