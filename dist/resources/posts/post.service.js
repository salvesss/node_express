import Post from './post.model.js';
import * as postsRepo from './post.memory.repository.js';
import * as usersRepo from '../users/user.memory.repository.js';
import * as commentsRepo from '../comments/comment.memory.repository.js';
const getAll = () => postsRepo.getAll();
const getById = (id) => postsRepo.getById(id);
const getAuthor = (postId) => postsRepo.getById(postId).then(async (post) => {
    if (!post)
        return null;
    return usersRepo.getById(post.userId);
});
const getComments = (postId) => commentsRepo.getByPostId(postId);
const create = async ({ title, text, userId, }) => {
    const user = await usersRepo.getById(userId);
    if (!user)
        return { error: 'USER_NOT_FOUND' };
    const post = new Post({ title, text, userId });
    return postsRepo.create(post);
};
const update = async (id, patch) => {
    const existing = await postsRepo.getById(id);
    if (!existing)
        return null;
    if (patch.userId !== undefined) {
        const user = await usersRepo.getById(patch.userId);
        if (!user)
            return { error: 'USER_NOT_FOUND' };
    }
    return postsRepo.update(id, patch);
};
const remove = async (id) => {
    const existing = await postsRepo.getById(id);
    if (!existing)
        return null;
    await commentsRepo.removeByPostId(id);
    await postsRepo.remove(id);
    return existing;
};
export { getAll, getById, getAuthor, getComments, create, update, remove };
