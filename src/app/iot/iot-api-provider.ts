import { NgZone } from '@angular/core';

// TODO Refactor with Lerna
import { ZetaPushClient, createApi } from '../zetapush';

import { IotApi } from './';

export function IotApiFactory(client: ZetaPushClient, zone: NgZone): IotApi {
	return createApi(client, zone, IotApi) as IotApi;
}

export const IotApiProvider = {
	provide: IotApi, useFactory: IotApiFactory, deps: [ ZetaPushClient, NgZone ]
}
