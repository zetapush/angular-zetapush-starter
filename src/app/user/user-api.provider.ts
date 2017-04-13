import { NgZone } from '@angular/core';
import { ZetaPushClient, createApi } from 'zetapush-angular';

import { UserApi } from './';

export function UserApiFactory(client: ZetaPushClient, zone: NgZone): UserApi {
  return createApi(client, zone, UserApi) as UserApi;
}

export const UserApiProvider = {
  provide: UserApi, useFactory: UserApiFactory, deps: [ ZetaPushClient, NgZone ]
};
