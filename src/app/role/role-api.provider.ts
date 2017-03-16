import { NgZone } from '@angular/core';

// TODO Refactor with Lerna
import { ZetaPushClient, createApi } from '../zetapush';

import { RoleApi } from './';

export function RoleApiFactory(client: ZetaPushClient, zone: NgZone): RoleApi {
  return createApi(client, zone, RoleApi) as RoleApi;
}

export const RoleApiProvider = {
  provide: RoleApi, useFactory: RoleApiFactory, deps: [ ZetaPushClient, NgZone ]
};
