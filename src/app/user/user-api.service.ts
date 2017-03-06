import { NgZone } from '@angular/core';

import { Api, ZetaPushClient, createApi } from '../zetapush';

export interface User {
  login: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

export class UserApi extends Api {
  createUser({ login, password, email, firstname, lastname }): Promise<User> {
    const parameters = { login, password, email, firstname, lastname };
    return this.$publish('createUser', parameters).then(({ user }) => user);
  }
}

export function UserApiFactory(client: ZetaPushClient, zone: NgZone): UserApi {
  return createApi(client, zone, UserApi) as UserApi;
}

export const UserApiProvider = {
  provide: UserApi, useFactory: UserApiFactory, deps: [ ZetaPushClient, NgZone ]
};
