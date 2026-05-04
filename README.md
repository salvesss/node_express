# Запуск (TypeScript)

npm install
npm run dev

# Сборка

npm run build
npm run serve

## PostgreSQL + Prisma (миграции)

Источник данных для сущностей — **PostgreSQL**. Доступ к БД реализован через **Prisma**, схема — `prisma/schema.prisma`, миграции — `prisma/migrations/*`.

### Переменные окружения

Скопируйте `.env.example` в `.env` и заполните минимум:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `DATABASE_URL` (уже сформирован в `.env.example`)

### Запуск через Docker

Поднимите БД (и при желании всё приложение):

```bash
docker compose up -d postgres
# или сразу весь стек:
# docker compose up -d
```

### Запуск миграций

Миграции запускаются **в Docker** (чтобы имя хоста `postgres` резолвилось внутри сети compose):

```bash
docker compose run --rm app npx prisma migrate deploy
```

Для локальной разработки (создание новой миграции из `schema.prisma`):

```bash
docker compose run --rm app npx prisma migrate dev
```

### Prisma Studio

```bash
docker compose run --rm -p 5555:5555 app npx prisma studio --port 5555 --hostname 0.0.0.0
```

# Создать пользователя

POST http://localhost:4000/users

{ "email": "user@gmail.com", "name": "Лёха", "password": "228" }

# Создать пост

POST http://localhost:4000/posts

{ "title": "Заголовок", "text": "Текст поста", "userId": "ВАШ-UUID" }

# Создать коммент

POST http://localhost:4000/comments

{ "text": "Комментарий", "userId": "ВАШ-UUID", "postId": "UUID-ПОСТА" }
