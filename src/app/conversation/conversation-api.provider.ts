import { NgZone } from '@angular/core';

// TODO Refactor with Lerna
import { ZetaPushClient, createApi } from '../zetapush';

import { ConversationApi } from './';

export function ConversationApiFactory(client: ZetaPushClient, zone: NgZone): ConversationApi {
  return createApi(client, zone, ConversationApi) as ConversationApi;
}

export const ConversationApiProvider = {
  provide: ConversationApi, useFactory: ConversationApiFactory, deps: [ ZetaPushClient, NgZone ]
};
