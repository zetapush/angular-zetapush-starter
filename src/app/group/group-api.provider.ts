import { NgZone } from '@angular/core';

// TODO Refactor with Lerna
import { ZetaPushClient, createApi } from '../zetapush';

import { GroupApi } from './';

export function GroupApiFactory(client: ZetaPushClient, zone: NgZone): GroupApi {
  return createApi(client, zone, GroupApi) as GroupApi;
}

export const GroupApiProvider = {
  provide: GroupApi, useFactory: GroupApiFactory, deps: [ ZetaPushClient, NgZone ]
};
