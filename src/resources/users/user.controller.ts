import type { Request, Response } from 'express';

import User from './user.model.js';
import Post from '../posts/post.model.js';
import Comment from '../comments/comment.model.js';
import * as usersService from './user.service.js';

const getAll = async (_req: Request, res: Response): Promise<void> => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
};

type IdParams = { id: string };

const getById = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const user = await usersService.getById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(User.toResponse(user));
};

const getPosts = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const user = await usersService.getById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const posts = await usersService.getPostsByUserId(req.params.id);
  res.json(posts.map(Post.toResponse));
};

const getComments = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const user = await usersService.getById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const comments = await usersService.getCommentsByUserId(req.params.id);
  res.json(comments.map(Comment.toResponse));
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { email, name, password } = req.body || {};
  if (!email || !name || !password) {
    res.status(400).json({ message: 'email, name and password are required' });
    return;
  }
  const user = await usersService.create({ email, name, password });
  res.status(201).json(User.toResponse(user));
};

const update = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const { email, name, password } = req.body || {};
  const user = await usersService.update(req.params.id, { email, name, password });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(User.toResponse(user));
};

const remove = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const user = await usersService.remove(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(204).send();
};

export { getAll, getById, getPosts, getComments, create, update, remove };
