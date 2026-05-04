import { comments } from '../../common/inMemoryStore.js';
import type { CommentEntity } from '../../common/types.js';

const getAll = async (): Promise<CommentEntity[]> => [...comments];
const getById = async (id: string): Promise<CommentEntity | undefined> => comments.find((c) => c.id === id);
const getByUserId = async (userId: string): Promise<CommentEntity[]> =>
  comments.filter((c) => c.userId === userId);
const getByPostId = async (postId: string): Promise<CommentEntity[]> =>
  comments.filter((c) => c.postId === postId);

const create = async (comment: CommentEntity): Promise<CommentEntity> => {
  comments.push(comment);
  return comment;
};

const update = async (id: string, patch: Partial<CommentEntity>): Promise<CommentEntity | null> => {
  const idx = comments.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  comments[idx] = { ...comments[idx], ...patch };
  return comments[idx];
};

const remove = async (id: string): Promise<CommentEntity | null> => {
  const idx = comments.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const [removed] = comments.splice(idx, 1);
  return removed;
};

const removeByPostId = async (postId: string): Promise<void> => {
  for (let i = comments.length - 1; i >= 0; i -= 1) {
    if (comments[i].postId === postId) comments.splice(i, 1);
  }
};

const removeByPostIds = async (postIds: string[]): Promise<void> => {
  const set = new Set(postIds);
  for (let i = comments.length - 1; i >= 0; i -= 1) {
    if (set.has(comments[i].postId)) comments.splice(i, 1);
  }
};

const removeByUserId = async (userId: string): Promise<void> => {
  for (let i = comments.length - 1; i >= 0; i -= 1) {
    if (comments[i].userId === userId) comments.splice(i, 1);
  }
};

export { getAll, getById, getByUserId, getByPostId, create, update, remove, removeByPostId, removeByPostIds, removeByUserId };
