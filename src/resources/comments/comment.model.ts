import { v4 as uuidv4 } from 'uuid';

import type { CommentEntity } from '../../common/types.js';

type CommentPayload = Partial<CommentEntity>;

class Comment implements CommentEntity {
  id: string;
  text: string;
  createdAt: number;
  userId: string;
  postId: string;

  constructor({ id = uuidv4(), text = '', createdAt = Date.now(), userId = '', postId = '' }: CommentPayload = {}) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.userId = userId;
    this.postId = postId;
  }

  static toResponse(comment: CommentEntity | null): CommentEntity | null {
    if (!comment) return null;
    const { id, text, createdAt, userId, postId } = comment;
    return { id, text, createdAt, userId, postId };
  }
}

export default Comment;
