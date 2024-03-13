package com.scottymcall.trelloclone.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnvController {

    @Value("${TENOR_API_KEY}")
    private String apiKey;

    @Value("${TRELLO_CLONE_PASSWORD}")
    private String password = "1234";

    @GetMapping("/api/key")
    public String getApiKey() {
        return this.apiKey;
    }

    @GetMapping("/api/password")
    public String getPassword(@RequestParam @NonNull String password) {
        if (password.equals(this.password)) {
            return "Correct";
        } else {
            return "Incorrect";
        }
    }
}