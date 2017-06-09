import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

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
    const parameters = {
      login,
      password,
      fields: { email, firstname, lastname },
    };
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
  updateUser({ login, ...fields }: { login: string }): Promise<User> {
    const parameters = { login, fields };
    return this.$publish('updateUser', parameters).then(({ user }) => user);
  }
}

export function UserApiFactory(client: ZetaPushClient, zone: NgZone): UserApi {
  return createApi(client, zone, UserApi) as UserApi;
}

export const UserApiProvider = {
  provide: UserApi,
  useFactory: UserApiFactory,
  deps: [ZetaPushClient, NgZone],
};
