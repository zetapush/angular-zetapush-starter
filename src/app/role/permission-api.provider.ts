import { NgZone } from '@angular/core';

// TODO Refactor with Lerna
import { ZetaPushClient, createApi } from '../zetapush';

import { PermissionApi } from './permission-api.service';

export function PermissionApiFactory(client: ZetaPushClient, zone: NgZone): PermissionApi {
  return createApi(client, zone, PermissionApi) as PermissionApi;
}

export const PermissionApiProvider = {
  provide: PermissionApi, useFactory: PermissionApiFactory, deps: [ ZetaPushClient, NgZone ]
};
