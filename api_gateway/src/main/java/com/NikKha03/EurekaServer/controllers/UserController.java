package com.NikKha03.EurekaServer.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/apiEureka/user")
public class UserController {
    @GetMapping("/get")
    public Object getUser(@AuthenticationPrincipal OidcUser oidcUser) {
        System.out.println(oidcUser);
        return oidcUser;
    }
}
