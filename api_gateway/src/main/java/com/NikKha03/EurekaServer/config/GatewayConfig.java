package com.NikKha03.EurekaServer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Value("${app-env.gateway-secret}")
    private String gatewaySecret;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("task_service", r -> r.path("/api/task_service/**")
                        .filters(f -> f.addRequestHeader("X-Gateway-Secret", gatewaySecret))
                        .uri("lb://TASKSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .route("task_service", r -> r.path("/api/swagger-ui/**")
                        .filters(f -> f.addRequestHeader("X-Gateway-Secret", gatewaySecret))
                        .uri("lb://TASKSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .route("user_service", r -> r.path("/api/user_service/**")
                        .filters(f -> f.addRequestHeader("X-Gateway-Secret", gatewaySecret))
                        .uri("lb://USERSERVICE")  // lb:// для балансировки нагрузки через Eureka
                ) 
                .route("user_service", r -> r.path("/api/login/**")
                        .filters(f -> f.addRequestHeader("X-Gateway-Secret", gatewaySecret))
                        .uri("lb://USERSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .route("user_service", r -> r.path("/api/oauth2/**")
                        .filters(f -> f.addRequestHeader("X-Gateway-Secret", gatewaySecret))
                        .uri("lb://USERSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .route("notification_service", r -> r.path("/api/notification_service/**")
                        .filters(f -> f.addRequestHeader("X-Gateway-Secret", gatewaySecret))
                        .uri("lb://NOTIFICATIONSERVICE")  // lb:// для балансировки нагрузки через Eureka
                )
                .build();
    }
}
