package com.scottymcall.trelloclone.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnvController {

    @Value("${TENOR_API_KEY}")
    private String apiKey;

    @GetMapping("/api/key")
    public String getApiKey() {
        return this.apiKey;
    }
}