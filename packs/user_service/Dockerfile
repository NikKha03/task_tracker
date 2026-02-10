# Используем официальный OpenJDK образ для запуска приложения
FROM eclipse-temurin:21-jdk

ARG JAR_FILE

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем jar файл из локальной машины в контейнер
COPY ${JAR_FILE} UserService.jar

# Команда для запуска приложения в контейнере
ENTRYPOINT ["java", "-jar", "UserService.jar"]

# Открываем порт, на котором будет работать приложение
EXPOSE 8080
