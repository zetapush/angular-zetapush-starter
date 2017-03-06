import { NgZone } from '@angular/core';

import { Api, ZetaPushClient, createApi } from '../zetapush';

export interface Metadata {
  [key: string]: any;
}

export interface Group {
  id: string;
  deploymentId: string;
  name: string;
  owner: string;
  resource: string;
  members: Array<any>;
  metadata: Metadata;
  tags: Array<string>;
}

export interface Role {
  id: string;
  name: string;
  role: Group;
}

export class RoleApi extends Api {
  getRole({ name }: { name: string }): Promise<Role> {
    return this.$publish('getRole', { name }).then(({ role }) => role);
  }
  listRole(): Promise<Array<Role>> {
    return this.$publish('listRole', { }).then(({ roles }) => roles);
  }
  listUserRole(): Promise<Array<Role>> {
    return this.$publish('listUserRole', { }).then(({ roles }) => roles);
  }
}

export function RoleApiFactory(client: ZetaPushClient, zone: NgZone): RoleApi {
  return createApi(client, zone, RoleApi) as RoleApi;
}

export const RoleApiProvider = {
  provide: RoleApi, useFactory: RoleApiFactory, deps: [ ZetaPushClient, NgZone ]
};
