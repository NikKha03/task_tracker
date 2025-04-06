package com.NikKha03.EurekaServer.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

//    @GetMapping("/logout")
//    public Mono<ResponseEntity<Void>> logout() {
//        return ReactiveSecurityContextHolder.getContext()
//                .flatMap(context -> {
//                    Authentication authentication = context.getAuthentication();
//                    if (!(authentication instanceof OAuth2AuthenticationToken oauthToken)) {
//                        return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
//                    }
//
//                    String registrationId = oauthToken.getAuthorizedClientRegistrationId();
//                    String principalName = oauthToken.getName();
//
//                    return Mono.zip(
//                            clientRegistrationRepository.findByRegistrationId(registrationId),
//                            authorizedClientService.loadAuthorizedClient(registrationId, principalName)
//                    ).map(tuple -> {
//                        ClientRegistration clientRegistration = tuple.getT1();
//                        OAuth2AuthorizedClient authorizedClient = tuple.getT2();
//
//                        String idToken = ((OidcUser) oauthToken.getPrincipal()).getIdToken().getTokenValue();
//
//                        URI logoutUri = UriComponentsBuilder
//                                .fromUriString(keycloakIssuerUri + "/protocol/openid-connect/logout")
//                                .queryParam("id_token_hint", idToken)
//                                .queryParam("post_logout_redirect_uri", postLogoutRedirectUri)
//                                .build().toUri();
//
//                        return ResponseEntity.status(HttpStatus.FOUND)
//                                .location(logoutUri)
//                                .build();
//                    });
//                });

}
