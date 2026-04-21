import express from 'express';
import userRouter from './resources/users/user.router.js';
import postRouter from './resources/posts/post.router.js';
import commentRouter from './resources/comments/comment.router.js';
const app = express();
app.use(express.json());
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
export default app;
