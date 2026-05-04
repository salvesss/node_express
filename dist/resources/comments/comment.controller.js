import User from '../users/user.model.js';
import Post from '../posts/post.model.js';
import Comment from './comment.model.js';
import * as commentsService from './comment.service.js';
const getAll = async (_req, res) => {
    const comments = await commentsService.getAll();
    res.json(comments.map(Comment.toResponse));
};
const getById = async (req, res) => {
    const comment = await commentsService.getById(req.params.id);
    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    res.json(Comment.toResponse(comment));
};
const getUser = async (req, res) => {
    const user = await commentsService.getAuthor(req.params.id);
    if (!user) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    res.json(User.toResponse(user));
};
const getPost = async (req, res) => {
    const post = await commentsService.getPost(req.params.id);
    if (!post) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    res.json(Post.toResponse(post));
};
const create = async (req, res) => {
    const userId = (req.body?.userId ?? req.query.userId);
    const postId = (req.body?.postId ?? req.query.postId);
    const { text } = req.body || {};
    if (!text || !userId || !postId) {
        res.status(400).json({ message: 'text, userId and postId are required' });
        return;
    }
    const result = await commentsService.create({ text, userId, postId });
    if ('error' in result && result.error === 'USER_NOT_FOUND') {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    if ('error' in result && result.error === 'POST_NOT_FOUND') {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.status(201).json(Comment.toResponse(result));
};
const update = async (req, res) => {
    const { text, userId, postId } = req.body || {};
    const patch = {};
    if (text !== undefined)
        patch.text = text;
    if (userId !== undefined)
        patch.userId = userId;
    if (postId !== undefined)
        patch.postId = postId;
    const comment = await commentsService.update(req.params.id, patch);
    if (comment && 'error' in comment && comment.error === 'USER_NOT_FOUND') {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    if (comment && 'error' in comment && comment.error === 'POST_NOT_FOUND') {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    res.json(Comment.toResponse(comment));
};
const remove = async (req, res) => {
    const comment = await commentsService.remove(req.params.id);
    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    res.status(204).send();
};
export { getAll, getById, getUser, getPost, create, update, remove };
