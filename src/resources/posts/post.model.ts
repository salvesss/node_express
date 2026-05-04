import { v4 as uuidv4 } from 'uuid';

import type { PostEntity } from '../../common/types.js';

type PostPayload = Partial<PostEntity>;

class Post implements PostEntity {
  id: string;
  title: string;
  text: string;
  createdAt: number;
  userId: string;

  constructor({ id = uuidv4(), title = '', text = '', createdAt = Date.now(), userId = '' }: PostPayload = {}) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.userId = userId;
  }

  static toResponse(post: PostEntity | null): PostEntity | null {
    if (!post) return null;
    const { id, title, text, createdAt, userId } = post;
    return { id, title, text, createdAt, userId };
  }
}

export default Post;
