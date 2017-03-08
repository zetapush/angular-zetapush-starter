// TODO Refactor with Lerna
import { Api } from '../zetapush';

export interface User {
  login: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

// TODO Should be auto-generated
export class UserApi extends Api {
  createUser({ login, password, email, firstname, lastname }): Promise<User> {
    const parameters = { login, password, email, firstname, lastname };
    return this.$publish('createUser', parameters).then(({ user }) => user);
  }
}
