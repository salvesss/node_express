import User from '../users/user.model.js';
import Post from './post.model.js';
import Comment from '../comments/comment.model.js';
import * as postsService from './post.service.js';

const getAll = async (req, res) => {
  const posts = await postsService.getAll();
  res.json(posts.map(Post.toResponse));
};

const getById = async (req, res) => {
  const post = await postsService.getById(req.params.id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.json(Post.toResponse(post));
};

const getUser = async (req, res) => {
  const user = await postsService.getAuthor(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.json(User.toResponse(user));
};

const getComments = async (req, res) => {
  const post = await postsService.getById(req.params.id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  const comments = await postsService.getComments(req.params.id);
  res.json(comments.map(Comment.toResponse));
};

const create = async (req, res) => {
  const userId = req.body.userId ?? req.query.userId;
  const { title, text } = req.body || {};
  if (!title || !text || !userId) {
    res.status(400).json({ message: 'title, text and userId are required' });
    return;
  }
  const result = await postsService.create({ title, text, userId });
  if (result && result.error === 'USER_NOT_FOUND') {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(201).json(Post.toResponse(result));
};

const update = async (req, res) => {
  const { title, text, userId } = req.body || {};
  const patch = {};
  if (title !== undefined) patch.title = title;
  if (text !== undefined) patch.text = text;
  if (userId !== undefined) patch.userId = userId;
  const post = await postsService.update(req.params.id, patch);
  if (post && post.error === 'USER_NOT_FOUND') {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.json(Post.toResponse(post));
};

const remove = async (req, res) => {
  const post = await postsService.remove(req.params.id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.status(204).send();
};

export { getAll, getById, getUser, getComments, create, update, remove };
