import { posts } from '../../common/inMemoryStore.js';
import type { PostEntity } from '../../common/types.js';

const getAll = async (): Promise<PostEntity[]> => [...posts];
const getById = async (id: string): Promise<PostEntity | undefined> => posts.find((p) => p.id === id);
const getByUserId = async (userId: string): Promise<PostEntity[]> => posts.filter((p) => p.userId === userId);
const getIdsByUserId = async (userId: string): Promise<string[]> =>
  posts.filter((p) => p.userId === userId).map((p) => p.id);

const create = async (post: PostEntity): Promise<PostEntity> => {
  posts.push(post);
  return post;
};

const update = async (id: string, patch: Partial<PostEntity>): Promise<PostEntity | null> => {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...patch };
  return posts[idx];
};

const remove = async (id: string): Promise<PostEntity | null> => {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const [removed] = posts.splice(idx, 1);
  return removed;
};

const removeByUserId = async (userId: string): Promise<void> => {
  for (let i = posts.length - 1; i >= 0; i -= 1) {
    if (posts[i].userId === userId) posts.splice(i, 1);
  }
};

export { getAll, getById, getByUserId, getIdsByUserId, create, update, remove, removeByUserId };
