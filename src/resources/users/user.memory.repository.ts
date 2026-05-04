import type { UserEntity } from '../../common/types.js';
import { prisma } from '../../common/prisma.js';

const toUserEntity = (u: {
  id: string;
  email: string;
  name: string;
  password: string;
  salt: string;
}): UserEntity => ({
  id: u.id,
  email: u.email,
  name: u.name,
  password: u.password,
  salt: u.salt,
});

const getAll = async (): Promise<UserEntity[]> => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, password: true, salt: true },
    orderBy: { createdAt: 'desc' },
  });
  return users.map(toUserEntity);
};

const getById = async (id: string): Promise<UserEntity | undefined> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, password: true, salt: true },
  });
  return user ? toUserEntity(user) : undefined;
};

const create = async (user: UserEntity): Promise<UserEntity> => {
  const created = await prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      salt: user.salt,
    },
    select: { id: true, email: true, name: true, password: true, salt: true },
  });
  return toUserEntity(created);
};

const update = async (id: string, patch: Partial<UserEntity>): Promise<UserEntity | null> => {
  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        email: patch.email,
        name: patch.name,
        password: patch.password,
        salt: patch.salt,
      },
      select: { id: true, email: true, name: true, password: true, salt: true },
    });
    return toUserEntity(updated);
  } catch {
    return null;
  }
};

const remove = async (id: string): Promise<UserEntity | null> => {
  try {
    const removed = await prisma.user.delete({
      where: { id },
      select: { id: true, email: true, name: true, password: true, salt: true },
    });
    return toUserEntity(removed);
  } catch {
    return null;
  }
};

export { getAll, getById, create, update, remove };
