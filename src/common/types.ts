export type EntityId = string;

export interface UserEntity {
  id: EntityId;
  email: string;
  name: string;
  password: string;
  salt: string;
}

export interface PostEntity {
  id: EntityId;
  title: string;
  text: string;
  createdAt: number;
  userId: EntityId;
}

export interface CommentEntity {
  id: EntityId;
  text: string;
  createdAt: number;
  userId: EntityId;
  postId: EntityId;
}
