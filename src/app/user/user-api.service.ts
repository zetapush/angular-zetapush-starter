import { Api, ZetaPushClient, createApi } from '../zetapush';

export interface User {
  login: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

export class UserApi extends Api {
  createUser({ login, password, email, firstname, lastname }) {
    return this.$publish('createUser', { login, password, email, firstname, lastname }, false);
  }
}

export function UserApiFactory(client: ZetaPushClient): UserApi {
  return createApi(client, UserApi) as UserApi;
}

export const UserApiProvider = {
  provide: UserApi, useFactory: UserApiFactory, deps: [ ZetaPushClient ]
};
