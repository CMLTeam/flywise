package com.cmlteam.flywise.model;

import javax.validation.constraints.NotNull;

public class SignUpRequest {
    @NotNull
    private String email;
    @NotNull
    private String password;

    public SignUpRequest() {
    }

    public SignUpRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}