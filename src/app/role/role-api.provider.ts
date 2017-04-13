import { NgZone } from '@angular/core';
import { ZetaPushClient, createApi } from 'zetapush-angular';

import { RoleApi } from './role-api.service';

export function RoleApiFactory(client: ZetaPushClient, zone: NgZone): RoleApi {
  return createApi(client, zone, RoleApi) as RoleApi;
}

export const RoleApiProvider = {
  provide: RoleApi, useFactory: RoleApiFactory, deps: [ ZetaPushClient, NgZone ]
};
