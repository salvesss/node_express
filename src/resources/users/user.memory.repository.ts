import { users } from '../../common/inMemoryStore.js';
import type { UserEntity } from '../../common/types.js';

const getAll = async (): Promise<UserEntity[]> => [...users];

const getById = async (id: string): Promise<UserEntity | undefined> => users.find((u) => u.id === id);

const create = async (user: UserEntity): Promise<UserEntity> => {
  users.push(user);
  return user;
};

const update = async (id: string, patch: Partial<UserEntity>): Promise<UserEntity | null> => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  return users[idx];
};

const remove = async (id: string): Promise<UserEntity | null> => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  const [removed] = users.splice(idx, 1);
  return removed;
};

export { getAll, getById, create, update, remove };
