<<<<<<< Updated upstream
# Запуск

npm start
=======
# Запуск (TypeScript)

npm install
npm run dev

# Сборка

npm run build
npm run serve
>>>>>>> Stashed changes

# Создать пользователя

POST http://localhost:4000/users

{ "email": "user@gmail.com", "name": "Лёха", "password": "228" }

# Создать пост

POST http://localhost:4000/posts

{ "title": "Заголовок", "text": "Текст поста", "userId": "ВАШ-UUID" }

# Создать коммент

POST http://localhost:4000/comments

{ "text": "Комментарий", "userId": "ВАШ-UUID", "postId": "UUID-ПОСТА" }
