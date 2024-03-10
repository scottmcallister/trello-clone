package com.scottymcall.trelloclone.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class ContentController {
    @GetMapping(value = "/index.html")
    public String getIndexHtml(Model model) {
        // Add any necessary model attributes here
        return "index"; // Assuming "index" is the name of your Thymeleaf template file
    }
}