# Используем официальный OpenJDK образ для запуска приложения
FROM openjdk:21-jdk-slim

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем jar файл из локальной машины в контейнер
COPY target/EurekaServer-0.0.1-SNAPSHOT.jar ApiGateway.jar

# Команда для запуска приложения в контейнере
ENTRYPOINT ["java", "-jar", "ApiGateway.jar"]

# Открываем порт, на котором будет работать приложение
EXPOSE 8080
