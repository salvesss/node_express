import { posts } from '../../common/inMemoryStore.js';

const getAll = async () => [...posts];

const getById = async (id) => posts.find((p) => p.id === id);

const getByUserId = async (userId) => posts.filter((p) => p.userId === userId);

const getIdsByUserId = async (userId) =>
  posts.filter((p) => p.userId === userId).map((p) => p.id);

const create = async (post) => {
  posts.push(post);
  return post;
};

const update = async (id, patch) => {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...patch };
  return posts[idx];
};

const remove = async (id) => {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const [removed] = posts.splice(idx, 1);
  return removed;
};

const removeByUserId = async (userId) => {
  for (let i = posts.length - 1; i >= 0; i -= 1) {
    if (posts[i].userId === userId) posts.splice(i, 1);
  }
};

export {
  getAll,
  getById,
  getByUserId,
  getIdsByUserId,
  create,
  update,
  remove,
  removeByUserId,
};
