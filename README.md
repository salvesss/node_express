# Запуск (TypeScript)

npm install
npm run dev

# Сборка

npm run build
npm run serve

# Создать пользователя

POST http://localhost:4000/users

{ "email": "user@gmail.com", "name": "Лёха", "password": "228" }

# Создать пост

POST http://localhost:4000/posts

{ "title": "Заголовок", "text": "Текст поста", "userId": "ВАШ-UUID" }

# Создать коммент

POST http://localhost:4000/comments

{ "text": "Комментарий", "userId": "ВАШ-UUID", "postId": "UUID-ПОСТА" }

## Docker и Docker Compose

### Подготовка

1. Установите [Docker Desktop](https://www.docker.com/products/docker-desktop/) (или Docker Engine + Compose plugin).
2. Скопируйте переменные окружения: скопируйте `.env.example` в `.env` и задайте свои `POSTGRES_PASSWORD`, `PGADMIN_DEFAULT_PASSWORD`, при необходимости `DOCKERHUB_USER` (логин Docker Hub для тегов образов).

### Запуск

```bash
docker compose up --build
```

- API: `http://localhost:${APP_PORT}` (в `.env`, по умолчанию **4000**; используется `APP_PORT`, чтобы не конфликтовать с системной переменной `PORT`).
- pgAdmin: `http://localhost:${PGADMIN_LISTEN_PORT}` (по умолчанию **5050**). Войдите email/password из `.env`. Добавьте сервер: **Host** `postgres`, **Port** `5432`, пользователь/БД/пароль — как в `.env`.

Каталог **`src`** смонтирован в контейнер приложения: при изменении файлов **nodemon** перезапускает процесс (требование к разработке в контейнере).

Образ **production** (только `dist`, без devDependencies):

```bash
docker build -f docker/app/Dockerfile --target production -t node-express-app:prod .
```

### Проверка образов на уязвимости

После сборки (пример имени из локальной сборки):

```bash
docker scout quickview node-express-app:prod
# или (при установленном Trivy)
# trivy image node-express-app:prod
```

Для Scout может потребоваться вход: `docker login`.

### Публикация образов в приватный репозиторий Docker Hub

1. `docker login`
2. Соберите и проставьте теги под свой репозиторий, например:
   - `docker tag local/node-express-app:latest YOURUSER/node-express-app:latest`
   - `docker tag local/node-express-postgres:latest YOURUSER/node-express-postgres:latest`
3. `docker push YOURUSER/node-express-app:latest` и `docker push YOURUSER/node-express-postgres:latest`

Имена `YOURUSER/...` должны совпадать с приватным репозиторием на Hub. В `.env` можно задать `DOCKERHUB_USER=YOURUSER`, пересобрать и выполнить `docker compose push` (Compose v2), либо вручную тегировать образы после `docker compose build`.

### Полезные команды

```bash
docker compose down          # остановить
docker compose down -v       # остановить и удалить volumes (данные БД пропадут)
docker compose logs -f app   # логи приложения
```
