import type { CommentEntity } from '../../common/types.js';
import Comment from './comment.model.js';
import * as commentsRepo from './comment.memory.repository.js';
import * as usersRepo from '../users/user.memory.repository.js';
import * as postsRepo from '../posts/post.memory.repository.js';

const getAll = () => commentsRepo.getAll();
const getById = (id: string) => commentsRepo.getById(id);

const getAuthor = (commentId: string) =>
  commentsRepo.getById(commentId).then(async (comment) => {
    if (!comment) return null;
    return usersRepo.getById(comment.userId);
  });

const getPost = (commentId: string) =>
  commentsRepo.getById(commentId).then(async (comment) => {
    if (!comment) return null;
    return postsRepo.getById(comment.postId);
  });

type ServiceError = { error: 'USER_NOT_FOUND' } | { error: 'POST_NOT_FOUND' };

const create = async ({
  text,
  userId,
  postId,
}: Pick<CommentEntity, 'text' | 'userId' | 'postId'>): Promise<CommentEntity | ServiceError> => {
  const user = await usersRepo.getById(userId);
  if (!user) return { error: 'USER_NOT_FOUND' };
  const post = await postsRepo.getById(postId);
  if (!post) return { error: 'POST_NOT_FOUND' };
  const comment = new Comment({ text, userId, postId });
  return commentsRepo.create(comment);
};

const update = async (
  id: string,
  patch: Partial<Pick<CommentEntity, 'text' | 'userId' | 'postId'>>,
): Promise<CommentEntity | ServiceError | null> => {
  const existing = await commentsRepo.getById(id);
  if (!existing) return null;
  if (patch.userId !== undefined) {
    const user = await usersRepo.getById(patch.userId);
    if (!user) return { error: 'USER_NOT_FOUND' };
  }
  if (patch.postId !== undefined) {
    const post = await postsRepo.getById(patch.postId);
    if (!post) return { error: 'POST_NOT_FOUND' };
  }
  return commentsRepo.update(id, patch);
};

const remove = (id: string) => commentsRepo.remove(id);

export { getAll, getById, getAuthor, getPost, create, update, remove };
