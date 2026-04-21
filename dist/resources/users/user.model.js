import { v4 as uuidv4 } from 'uuid';
class User {
    id;
    email;
    name;
    password;
    salt;
    constructor({ id = uuidv4(), email = '', name = '', password = '', salt = '' } = {}) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.salt = salt;
    }
    static toResponse(user) {
        if (!user)
            return null;
        const { id, email, name } = user;
        return { id, email, name };
    }
}
export default User;
