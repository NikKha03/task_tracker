# api_gateway

**Для начала работы необходимо**

1. Создать ```application.yaml``` файл

```angular2html
spring:
  main:
    web-application-type: reactive
  application:
    name: ApiGateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
    register-with-eureka: true
    fetch-registry: true
  instance:
    prefer-ip-address: true
server:
  port: 8080

dop-urls:
  allowed-origins: your-origins
```

**Для упаковки в docker**

1. Создать образ 

```docker build -t api_gateway:v1 .```

2. Создать контейнер

```docker run --name ApiGateway -p 8080:8080 api_gateway:v1```