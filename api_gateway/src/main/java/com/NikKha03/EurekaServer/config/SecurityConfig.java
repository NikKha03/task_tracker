package com.NikKha03.EurekaServer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Value("#{'${dop-urls.allowed-origins}'.split(', ')}")
    private List<String> allowedOrigins;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/**").permitAll())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost", "https://tracker.sharpbubbles.ru"));
                    config.addAllowedHeader("*");
                    config.addAllowedMethod("*");
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .build();
    }

//    @Bean
//    public ServerAuthenticationSuccessHandler successHandler() {
//        return (webFilterExchange, authentication) -> {
//            webFilterExchange.getExchange().getResponse()
//                    .setStatusCode(HttpStatus.FOUND); // HTTP 302 Redirect
//            webFilterExchange.getExchange().getResponse()
//                    .getHeaders().setLocation(URI.create(frontendMainPage)); // URL после входа
//
//
//            System.out.println(authentication.getName()); // получаю username пользователя из keycloak
//            // далее проверяю есть ли он в бд task_service
//            // если нет - добавляю, иначе ничего не делаю
//
//            return webFilterExchange.getExchange().getResponse().setComplete();
//        };
//    }

//    @Bean
//    public ServerAuthenticationSuccessHandler successHandler() {
//        return (webFilterExchange, authentication) -> {
//            ServerHttpResponse response = webFilterExchange.getExchange().getResponse();
//            response.setStatusCode(HttpStatus.FOUND);
//            response.getHeaders().setLocation(URI.create(frontendMainPage));
//
//            return taskServiceClient.isDataHave(authentication.getName())
//                    .flatMap(hasData -> {
//                        if (Boolean.FALSE.equals(hasData)) {
//                            UserDto userDto = new UserDto();
//                            userDto.setUsername(authentication.getName());
//                            return taskServiceClient.pushUserInTaskService(userDto);
//                        } else {
//                            return Mono.empty(); // ничего не делаем
//                        }
//                    })
//                    .then(response.setComplete()); // завершение запроса после всей логики
//        };
//    }


}
