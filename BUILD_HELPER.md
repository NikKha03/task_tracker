# Spring boot

В IDE нужна команда `spring-boot:build-image` для сборки `jar` файлов.

# Docker

Чтобы полностью пересобрать проект в Docker Compose, сбросив кэш, обновив базовые образы и удалив старые данные, используйте следующую комбинацию команд:

`bashdocker compose down --volumes --rmi all && docker compose build --no-cache && docker compose up -d`

## Разбор команды по шагам

- `docker compose down --volumes --rmi all`

-   - `--volumes` (-v): удаляет все именованные и анонимные разделы (volumes), очищая базы данных и кэш контейнеров.
-   - `--rmi all`: удаляет все образы, использованные в этом проекте, заставляя Docker скачать их заново.

- `docker compose build --no-cache`

-   - `--no-cache`: запрещает использовать слои из кэша. Docker заново выполнит каждую строчку в ваших `Dockerfile`.

- `docker compose up -d`

-   - Запускает контейнеры в фоновом режиме (detached mode) после полной сборки.
