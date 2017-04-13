import { Observable } from 'rxjs/Observable';
import { Api } from 'zetapush-angular';

export interface User {
  login: string;
  email: string;
  firstname: string;
  lastname: string;
  userKey: string;
}

interface UserWrapper {
  user: User;
}

// TODO Should be auto-generated
export class UserApi extends Api {
  onCreateUser: Observable<UserWrapper>;
  onUpdateUser: Observable<UserWrapper>;

  createUser({ login, password, email, firstname, lastname }): Promise<User> {
    const parameters = { login, password, email, firstname, lastname };
    return this.$publish('createUser', parameters).then(({ user }) => user);
  }
  getUser({ userKey }: { userKey?: string }): Promise<User> {
    const parameters = { userKey };
    return this.$publish('getUser', parameters).then(({ user }) => user);
  }
  getUserByLogin({ login }: { login: string }): Promise<User> {
    const parameters = { login };
    return this.$publish('getUserByLogin', parameters).then(({ user }) => user);
  }
  getUserList({ userKeys }: { userKeys: Array<string> }): Promise<any> {
    return this.$publish('getUserList', { userKeys });
  }
  updateUser({ login, ...profile }: { login: string }): Promise<User> {
    const parameters = { login, ...profile };
    return this.$publish('updateUser', parameters).then(({ user }) => user);
  }
}
