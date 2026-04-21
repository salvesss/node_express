import { v4 as uuidv4 } from 'uuid';
class Post {
    id;
    title;
    text;
    createdAt;
    userId;
    constructor({ id = uuidv4(), title = '', text = '', createdAt = Date.now(), userId = '' } = {}) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.createdAt = createdAt;
        this.userId = userId;
    }
    static toResponse(post) {
        if (!post)
            return null;
        const { id, title, text, createdAt, userId } = post;
        return { id, title, text, createdAt, userId };
    }
}
export default Post;
