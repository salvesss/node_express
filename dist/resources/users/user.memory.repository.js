import { users } from '../../common/inMemoryStore.js';
const getAll = async () => [...users];
const getById = async (id) => users.find((u) => u.id === id);
const create = async (user) => {
    users.push(user);
    return user;
};
const update = async (id, patch) => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1)
        return null;
    users[idx] = { ...users[idx], ...patch };
    return users[idx];
};
const remove = async (id) => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1)
        return null;
    const [removed] = users.splice(idx, 1);
    return removed;
};
export { getAll, getById, create, update, remove };
