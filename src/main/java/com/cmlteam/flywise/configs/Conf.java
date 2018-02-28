package com.cmlteam.flywise.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Conf {
    private final String appBaseUrl;

    public Conf(@Value("${app.baseUrl}") String appBaseUrl) {
        this.appBaseUrl = appBaseUrl;
    }

    public String getAppBaseUrl() {
        return appBaseUrl;
    }
}
