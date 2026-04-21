import type { Request, Response } from 'express';

import User from '../users/user.model.js';
import Post from '../posts/post.model.js';
import Comment from './comment.model.js';
import * as commentsService from './comment.service.js';

type IdParams = { id: string };

const getAll = async (_req: Request, res: Response): Promise<void> => {
  const comments = await commentsService.getAll();
  res.json(comments.map(Comment.toResponse));
};

const getById = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const comment = await commentsService.getById(req.params.id);
  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  res.json(Comment.toResponse(comment));
};

const getUser = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const user = await commentsService.getAuthor(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  res.json(User.toResponse(user));
};

const getPost = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const post = await commentsService.getPost(req.params.id);
  if (!post) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  res.json(Post.toResponse(post));
};

const create = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.body?.userId ?? req.query.userId) as string | undefined;
  const postId = (req.body?.postId ?? req.query.postId) as string | undefined;
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

const update = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const { text, userId, postId } = req.body || {};
  const patch: { text?: string; userId?: string; postId?: string } = {};
  if (text !== undefined) patch.text = text;
  if (userId !== undefined) patch.userId = userId;
  if (postId !== undefined) patch.postId = postId;
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

const remove = async (req: Request<IdParams>, res: Response): Promise<void> => {
  const comment = await commentsService.remove(req.params.id);
  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  res.status(204).send();
};

export { getAll, getById, getUser, getPost, create, update, remove };
