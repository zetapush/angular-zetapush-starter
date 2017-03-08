import { NgZone } from '@angular/core';

import { ZetaPushClient, createApi } from '../zetapush';

import { UserApi } from './index';

export function UserApiFactory(client: ZetaPushClient, zone: NgZone): UserApi {
  return createApi(client, zone, UserApi) as UserApi;
}

export const UserApiProvider = {
  provide: UserApi, useFactory: UserApiFactory, deps: [ ZetaPushClient, NgZone ]
};
