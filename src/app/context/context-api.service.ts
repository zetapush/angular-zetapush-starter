import { NgZone } from '@angular/core';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

// TODO Should be auto-generated
export class ContextApi extends Api {

}

export function ContextApiFactory(client: ZetaPushClient, zone: NgZone): ContextApi {
  return createApi(client, zone, ContextApi) as ContextApi;
}

export const ContextApiProvider = {
  provide: ContextApi, useFactory: ContextApiFactory, deps: [ ZetaPushClient, NgZone ]
};
