import { NgZone } from '@angular/core';
import { ZetaPushClient, createApi } from 'zetapush-angular';

import { WhiteboardApi } from './';

export function WhiteboardApiFactory(client: ZetaPushClient, zone: NgZone): WhiteboardApi {
  return createApi(client, zone, WhiteboardApi) as WhiteboardApi;
}

export const WhiteboardApiProvider = {
  provide: WhiteboardApi, useFactory: WhiteboardApiFactory, deps: [ ZetaPushClient, NgZone ]
};
