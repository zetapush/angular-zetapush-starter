import { NgZone } from '@angular/core';

// TODO Refactor with Lerna
import { ZetaPushClient, createApi } from '../zetapush';

import { UnlockingApi } from './';

export function UnlockingApiFactory(client: ZetaPushClient, zone: NgZone): UnlockingApi {
	return createApi(client, zone, UnlockingApi) as UnlockingApi;
}

export const UnlockingApiProvider = {
	provide: UnlockingApi, useFactory: UnlockingApiFactory, deps: [ ZetaPushClient, NgZone ]
}