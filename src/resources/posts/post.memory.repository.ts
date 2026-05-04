import type { PostEntity } from '../../common/types.js';
import { prisma } from '../../common/prisma.js';

const toPostEntity = (p: {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  userId: string;
}): PostEntity => ({
  id: p.id,
  title: p.title,
  text: p.text,
  createdAt: p.createdAt.getTime(),
  userId: p.userId,
});

const getAll = async (): Promise<PostEntity[]> => {
  const posts = await prisma.post.findMany({
    select: { id: true, title: true, text: true, createdAt: true, userId: true },
    orderBy: { createdAt: 'desc' },
  });
  return posts.map(toPostEntity);
};

const getById = async (id: string): Promise<PostEntity | undefined> => {
  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true, title: true, text: true, createdAt: true, userId: true },
  });
  return post ? toPostEntity(post) : undefined;
};

const getByUserId = async (userId: string): Promise<PostEntity[]> => {
  const posts = await prisma.post.findMany({
    where: { userId },
    select: { id: true, title: true, text: true, createdAt: true, userId: true },
    orderBy: { createdAt: 'desc' },
  });
  return posts.map(toPostEntity);
};

const getIdsByUserId = async (userId: string): Promise<string[]> => {
  const posts = await prisma.post.findMany({
    where: { userId },
    select: { id: true },
  });
  return posts.map((p) => p.id);
};

const create = async (post: PostEntity): Promise<PostEntity> => {
  const created = await prisma.post.create({
    data: {
      id: post.id,
      title: post.title,
      text: post.text,
      userId: post.userId,
      createdAt: new Date(post.createdAt),
    },
    select: { id: true, title: true, text: true, createdAt: true, userId: true },
  });
  return toPostEntity(created);
};

const update = async (id: string, patch: Partial<PostEntity>): Promise<PostEntity | null> => {
  try {
    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: patch.title,
        text: patch.text,
        userId: patch.userId,
      },
      select: { id: true, title: true, text: true, createdAt: true, userId: true },
    });
    return toPostEntity(updated);
  } catch {
    return null;
  }
};

const remove = async (id: string): Promise<PostEntity | null> => {
  try {
    const removed = await prisma.post.delete({
      where: { id },
      select: { id: true, title: true, text: true, createdAt: true, userId: true },
    });
    return toPostEntity(removed);
  } catch {
    return null;
  }
};

const removeByUserId = async (userId: string): Promise<void> => {
  await prisma.post.deleteMany({ where: { userId } });
};

export { getAll, getById, getByUserId, getIdsByUserId, create, update, remove, removeByUserId };
