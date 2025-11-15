package com.NikKha03.EurekaServer.filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
public class JwtAuthenticationFilter implements GatewayFilter, Ordered {

    private final WebClient webClient = WebClient.builder().build();

    @Value("${app-env.user-service-url}")
    private String userServiceUrl;

    @Value("${app-env.gateway-secret}")
    private String gatewaySecret;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }

        // @TODO надо проверять еще refresh token
        // Запрос к Auth-service
        return webClient.get()
                .uri(userServiceUrl)
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .header("X-Gateway-Secret", gatewaySecret)
                .retrieve()
                .onStatus(HttpStatusCode::isError, response -> Mono.error(new RuntimeException("Token invalid")))
                .bodyToMono(String.class)
                .flatMap(response -> chain.filter(exchange)) // токен валиден → продолжаем
                .onErrorResume(ex -> unauthorized(exchange, "Invalid token"));
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        DataBuffer buffer = exchange.getResponse()
                .bufferFactory()
                .wrap(message.getBytes(StandardCharsets.UTF_8));
        return exchange.getResponse().writeWith(Mono.just(buffer));
    }

    @Override
    public int getOrder() {
        return -1; // фильтр должен выполняться до маршрутизации
    }
}
