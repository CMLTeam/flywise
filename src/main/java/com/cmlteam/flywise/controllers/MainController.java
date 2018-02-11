package com.cmlteam.flywise.controllers;

import com.cmlteam.flywise.model.User;
import com.cmlteam.flywise.services.SampleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class MainController {

    private static final Logger log = LoggerFactory.getLogger(MainController.class);

    private final SampleService sampleService;

    @Autowired
    public MainController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public String root() {
//        return "forward:/index.html";
//    }

    @RequestMapping(value = "/testdb", method = RequestMethod.GET)
    public String testdb() {
        return sampleService.getDbVersion();
    }

    @RequestMapping(value = "/testjs", method = RequestMethod.GET)
    public List<User> testjs() {
        return Arrays.asList(
                new User(1, "Ivan", "Ivanov"),
                new User(2, "Peter", "Petrov"),
                new User(3, "Sidor", "Sidorov")
        );
    }
}
