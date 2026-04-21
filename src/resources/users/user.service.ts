import crypto from 'crypto';

import type { UserEntity } from '../../common/types.js';
import User from './user.model.js';
import * as usersRepo from './user.memory.repository.js';
import * as postsRepo from '../posts/post.memory.repository.js';
import * as commentsRepo from '../comments/comment.memory.repository.js';

const hashPassword = (password: string, salt: string): string =>
  crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

const getAll = () => usersRepo.getAll();
const getById = (id: string) => usersRepo.getById(id);
const getPostsByUserId = (userId: string) => postsRepo.getByUserId(userId);
const getCommentsByUserId = (userId: string) => commentsRepo.getByUserId(userId);

const create = async ({ email, name, password }: Pick<UserEntity, 'email' | 'name' | 'password'>) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const user = new User({ email, name, password: hashPassword(password, salt), salt });
  return usersRepo.create(user);
};

const update = async (id: string, { email, name, password }: Partial<UserEntity>) => {
  const existing = await usersRepo.getById(id);
  if (!existing) return null;
  const patch: Partial<UserEntity> = {};
  if (email !== undefined) patch.email = email;
  if (name !== undefined) patch.name = name;
  if (password !== undefined) {
    const salt = crypto.randomBytes(16).toString('hex');
    patch.salt = salt;
    patch.password = hashPassword(password, salt);
  }
  return usersRepo.update(id, patch);
};

const remove = async (id: string) => {
  const existing = await usersRepo.getById(id);
  if (!existing) return null;
  const postIds = await postsRepo.getIdsByUserId(id);
  await commentsRepo.removeByPostIds(postIds);
  await commentsRepo.removeByUserId(id);
  await postsRepo.removeByUserId(id);
  await usersRepo.remove(id);
  return existing;
};

export { getAll, getById, getPostsByUserId, getCommentsByUserId, create, update, remove };
