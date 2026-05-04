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
