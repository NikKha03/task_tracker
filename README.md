# Task-tracker v1.0

Task-tracker — сервис для отслеживания выполнения задач.

## Архитектура проекта

Frontend (текущий репозиторий)

Backend:

- [Auth](https://github.com/NikKha03/Task-tracker-AuthService) — сервис по работе с пользователями
- [Task](https://github.com/NikKha03/Task-tracker-TaskService) — сервис по работе с задачами

![Архитектура проекта](/img/архитектура.png)

## Установка

Получение docker образа проекта:

`docker pull kolyakhalimendik/task-tracker-frontend:v1.0`

Создание docker контейнера на основе полученного образа:

`docker run --name frontend-task-tracker -p 3000:5173 -d kolyakhalimendik/task-tracker-frontend:v1.0`

<!-- ## Интерфейс -->
