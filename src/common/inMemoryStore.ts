import type { CommentEntity, PostEntity, UserEntity } from './types.js';

/** Shared in-memory storage for all entities */
const users: UserEntity[] = [];
const posts: PostEntity[] = [];
const comments: CommentEntity[] = [];

export { users, posts, comments };
