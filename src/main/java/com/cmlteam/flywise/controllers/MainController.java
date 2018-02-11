package com.cmlteam.flywise.controllers;

import com.cmlteam.flywise.services.SampleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private static final Logger log = LoggerFactory.getLogger(MainController.class);

    private final SampleService sampleService;

    @Autowired
    public MainController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @RequestMapping(value = "/testdb", method = RequestMethod.GET)
    public String testdb() {
        return sampleService.getDbVersion();
    }
}
