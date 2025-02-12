# api_gateway

Репозиторий содержит в себе минимально настроенный API Gateway на базе Spring Eureka, подключенный к Keycloak для авторизации пользователей.

**Для начала работы необходимо:**

Клонировать репозиторий

```angular2html
git clone https://github.com/NikKha03/api_gateway.git
```

Добавить ```application.yaml``` файл

```angular2html
cd api_gateway/src/main/resources && touch application.yaml
```

Заполнить ```application.yaml``` файл своими данными

```angular2html
eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: true
    fetch-registry: false
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
server:
  port: 8761

dop-urls:
  main-page: your-url
  allowed-origins: your-origins

spring:
  application:
    name: EurekaServer
  security:
    oauth2:
      client:
        registration:
          keycloak:
            client-id: your-client-id
            client-secret: your-client-secret
            redirect-uri: your-redirect-uri
            scope:
              - openid
              - microprofile-jwt
            clientName: Keycloak
        provider:
          keycloak:
            issuer-uri: your-issuer-uri
            user-name-attribute: preferred_username
```
По _redirect-uri_ пользователь перенаправляется на страницу авторизации.

**После авторизации через API Gateway можно сделать с клиента GET запрос на получение данных авторизованного пользователя:**

```http://localhost:8761/apiEureka/user/get```
