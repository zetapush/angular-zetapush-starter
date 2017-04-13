import { NgZone } from '@angular/core';
import { ZetaPushClient, createApi } from 'zetapush-angular';

import { FileApi } from './';

export function FileApiFactory(client: ZetaPushClient, zone: NgZone): FileApi {
  return createApi(client, zone, FileApi) as FileApi;
}

export const FileApiProvider = {
  provide: FileApi, useFactory: FileApiFactory, deps: [ ZetaPushClient, NgZone ]
};
