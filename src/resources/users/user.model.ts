import { v4 as uuidv4 } from 'uuid';

import type { UserEntity } from '../../common/types.js';

type UserPayload = Partial<UserEntity>;
type UserResponse = Pick<UserEntity, 'id' | 'email' | 'name'>;

class User implements UserEntity {
  id: string;
  email: string;
  name: string;
  password: string;
  salt: string;

  constructor({ id = uuidv4(), email = '', name = '', password = '', salt = '' }: UserPayload = {}) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.salt = salt;
  }

  static toResponse(user: UserEntity | null): UserResponse | null {
    if (!user) return null;
    const { id, email, name } = user;
    return { id, email, name };
  }
}

export default User;
