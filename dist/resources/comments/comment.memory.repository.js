import { prisma } from '../../common/prisma.js';
const toCommentEntity = (c) => ({
    id: c.id,
    text: c.text,
    createdAt: c.createdAt.getTime(),
    userId: c.userId,
    postId: c.postId,
});
const getAll = async () => {
    const comments = await prisma.comment.findMany({
        select: { id: true, text: true, createdAt: true, userId: true, postId: true },
        orderBy: { createdAt: 'desc' },
    });
    return comments.map(toCommentEntity);
};
const getById = async (id) => {
    const comment = await prisma.comment.findUnique({
        where: { id },
        select: { id: true, text: true, createdAt: true, userId: true, postId: true },
    });
    return comment ? toCommentEntity(comment) : undefined;
};
const getByUserId = async (userId) => {
    const comments = await prisma.comment.findMany({
        where: { userId },
        select: { id: true, text: true, createdAt: true, userId: true, postId: true },
        orderBy: { createdAt: 'desc' },
    });
    return comments.map(toCommentEntity);
};
const getByPostId = async (postId) => {
    const comments = await prisma.comment.findMany({
        where: { postId },
        select: { id: true, text: true, createdAt: true, userId: true, postId: true },
        orderBy: { createdAt: 'desc' },
    });
    return comments.map(toCommentEntity);
};
const create = async (comment) => {
    const created = await prisma.comment.create({
        data: {
            id: comment.id,
            text: comment.text,
            userId: comment.userId,
            postId: comment.postId,
            createdAt: new Date(comment.createdAt),
        },
        select: { id: true, text: true, createdAt: true, userId: true, postId: true },
    });
    return toCommentEntity(created);
};
const update = async (id, patch) => {
    try {
        const updated = await prisma.comment.update({
            where: { id },
            data: {
                text: patch.text,
                userId: patch.userId,
                postId: patch.postId,
            },
            select: { id: true, text: true, createdAt: true, userId: true, postId: true },
        });
        return toCommentEntity(updated);
    }
    catch {
        return null;
    }
};
const remove = async (id) => {
    try {
        const removed = await prisma.comment.delete({
            where: { id },
            select: { id: true, text: true, createdAt: true, userId: true, postId: true },
        });
        return toCommentEntity(removed);
    }
    catch {
        return null;
    }
};
const removeByPostId = async (postId) => {
    await prisma.comment.deleteMany({ where: { postId } });
};
const removeByPostIds = async (postIds) => {
    await prisma.comment.deleteMany({ where: { postId: { in: postIds } } });
};
const removeByUserId = async (userId) => {
    await prisma.comment.deleteMany({ where: { userId } });
};
export { getAll, getById, getByUserId, getByPostId, create, update, remove, removeByPostId, removeByPostIds, removeByUserId };
