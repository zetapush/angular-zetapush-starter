// TODO Refactor with Lerna
import { Api } from '../zetapush';

export interface User {
  login: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  userKey: string;
}

// TODO Should be auto-generated
export class UserApi extends Api {
  createUser({ login, password, email, firstname, lastname }): Promise<User> {
    const parameters = { login, password, email, firstname, lastname };
    return this.$publish('createUser', parameters).then(({ user }) => user);
  }
  getUser({ userKey }: { userKey: string }): Promise<User> {
    const parameters = { userKey };
    return this.$publish('getUser', parameters).then(({ user }) => user);
  }
  getUserByLogin({ login }: { login: string }): Promise<User> {
    const parameters = { login };
    return this.$publish('getUserByLogin', parameters).then(({ user }) => user);
  }
  updateUser({ login, ...profile }: { login: string }): Promise<User> {
    const parameters = { login, ...profile };
    return this.$publish('updateUser', parameters).then(({ user }) => user);
  }
}
