package com.scottymcall.trelloclone.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.scottymcall.trelloclone.model.LoginRequest;
import com.scottymcall.trelloclone.model.UserSession;
import com.scottymcall.trelloclone.repository.UserSessionRepository;

@RestController
public class EnvController {

    private final UserSessionRepository userSessionRepository;

    @Value("${TENOR_API_KEY}")
    private String apiKey;

    @Value("${TRELLO_CLONE_PASSWORD}")
    private String password;

    public EnvController(UserSessionRepository userSessionRepository) {
        this.userSessionRepository = userSessionRepository;
    }

    @GetMapping("/api/key")
    public String getApiKey() {
        return this.apiKey;
    }

    @PostMapping("/api/login")
    public ResponseEntity<UserSession> getPassword(@RequestBody @NonNull LoginRequest loginRequest) {
        
        String password = loginRequest.getPassword();
        if (password.equals(this.password)) {
            // Generate a session token
            String sessionToken = UUID.randomUUID().toString();
            String username = loginRequest.getUsername();
            UserSession userSession = new UserSession(sessionToken, username);

            // Log the session token
            userSessionRepository.save(userSession);

            return ResponseEntity.ok(userSession);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}