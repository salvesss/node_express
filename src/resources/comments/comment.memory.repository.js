import { comments } from '../../common/inMemoryStore.js';

const getAll = async () => [...comments];

const getById = async (id) => comments.find((c) => c.id === id);

const getByUserId = async (userId) => comments.filter((c) => c.userId === userId);

const getByPostId = async (postId) => comments.filter((c) => c.postId === postId);

const create = async (comment) => {
  comments.push(comment);
  return comment;
};

const update = async (id, patch) => {
  const idx = comments.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  comments[idx] = { ...comments[idx], ...patch };
  return comments[idx];
};

const remove = async (id) => {
  const idx = comments.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const [removed] = comments.splice(idx, 1);
  return removed;
};

const removeByPostId = async (postId) => {
  for (let i = comments.length - 1; i >= 0; i -= 1) {
    if (comments[i].postId === postId) comments.splice(i, 1);
  }
};

const removeByPostIds = async (postIds) => {
  const set = new Set(postIds);
  for (let i = comments.length - 1; i >= 0; i -= 1) {
    if (set.has(comments[i].postId)) comments.splice(i, 1);
  }
};

const removeByUserId = async (userId) => {
  for (let i = comments.length - 1; i >= 0; i -= 1) {
    if (comments[i].userId === userId) comments.splice(i, 1);
  }
};

export {
  getAll,
  getById,
  getByUserId,
  getByPostId,
  create,
  update,
  remove,
  removeByPostId,
  removeByPostIds,
  removeByUserId,
};
