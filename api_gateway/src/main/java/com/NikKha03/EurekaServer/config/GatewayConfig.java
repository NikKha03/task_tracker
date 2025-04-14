package com.NikKha03.EurekaServer.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("task_service", r -> r.path("/task_service/**")
                        .uri("lb://TASKSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .route("user_service", r -> r.path("/user_service/**")
                        .uri("lb://USERSERVICE")  // lb:// для балансировки нагрузки через Eureka
                ) .route("user_service", r -> r.path("/login/**")
                        .uri("lb://USERSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .route("user_service", r -> r.path("/oauth2/**")
                        .uri("lb://USERSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .build();
    }
}