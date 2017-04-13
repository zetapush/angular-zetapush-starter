import { NgZone } from '@angular/core';
import { ZetaPushClient, createApi } from 'zetapush-angular';

import { OrganizationApi } from './';

export function OrganizationApiFactory(client: ZetaPushClient, zone: NgZone): OrganizationApi {
  return createApi(client, zone, OrganizationApi) as OrganizationApi;
}

export const OrganizationApiProvider = {
  provide: OrganizationApi, useFactory: OrganizationApiFactory, deps: [ ZetaPushClient, NgZone ]
};
