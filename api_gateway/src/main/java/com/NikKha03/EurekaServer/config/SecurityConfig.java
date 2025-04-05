package com.NikKha03.EurekaServer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;

import java.net.URI;
import java.util.List;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Value("${dop-urls.main-page}")
    private String frontendMainPage;

    @Value("#{'${dop-urls.allowed-origins}'.split(', ')}")
    private List<String> allowedOrigins;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/**").permitAll())
                .oauth2Login(oauth2 -> oauth2.authenticationSuccessHandler(successHandler()))
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5175", "https://task.sharpbubbles.ru"));
                    config.addAllowedHeader("*");
                    config.addAllowedMethod("*");
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .build();
    }

    @Bean
    public ServerAuthenticationSuccessHandler successHandler() {
        return (webFilterExchange, authentication) -> {
            webFilterExchange.getExchange().getResponse()
                    .setStatusCode(HttpStatus.FOUND); // HTTP 302 Redirect
            webFilterExchange.getExchange().getResponse()
                    .getHeaders().setLocation(URI.create(frontendMainPage)); // URL после входа
            return webFilterExchange.getExchange().getResponse().setComplete();
        };
    }

}
