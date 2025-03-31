package com.NikKha03.EurekaServer.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api_gateway/user")
public class UserController {

    @GetMapping("/get")
    public Mono<Object> getUser(@AuthenticationPrincipal Mono<OidcUser> oidcUserMono) {
        return oidcUserMono.map(oidcUser -> {
            System.out.println("Username: " + oidcUser.getPreferredUsername());
            return oidcUser;
        });
    }

}
