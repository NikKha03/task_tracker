# Task-tracker v1.0

Task-tracker — сервис для отслеживания выполнения задач.

Основной целью данного проекта является разработка программного решения с использованием микросервисной архитектуры.

Кроме того, стояли следующие задачи:

1. Упаковать проект в Docker контейнеры
2. Сделать авторизацию через YandexID
3. Использовать Swagger для описания REST API

## Архитектура проекта

Frontend (текущий репозиторий)

Backend:

- [Auth](https://github.com/NikKha03/Task-tracker-AuthService) — сервис по работе с пользователями
- [Task](https://github.com/NikKha03/Task-tracker-TaskService) — сервис по работе с задачами

![Архитектура проекта](/img/архитектура.png)

## Установка и запуск

### Docker

Получение docker образа проекта:

`docker pull kolyakhalimendik/task-tracker-frontend:v1.0`

Создание и запуск docker контейнера на основе полученного образа:

`docker run --name frontend-task-tracker -p 3000:5173 -d kolyakhalimendik/task-tracker-frontend:v1.0`

### Github

Скачиваем проект:

`git clone git@github.com:NikKha03/Task-tracker-Frontend.git`

В папке проекта вводим команду для запуска:

`npm run dev`

## Интерфейс

![Авторизация](/img/вход.png)
![Создать задачу](/img/создать.png)
![На сегодня](/img/сегодня.png)
![В планах](/img/в-планах.png)
![Не выполнено](/img/не-выполнено.png)
![Когда-нибудь](/img/когда-нибудь.png)
![Завершено](/img/завершено.png)
