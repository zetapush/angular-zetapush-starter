import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

// TODO Refactor with Lerna
import { Metadata } from '../core';
// TODO Refactor with Lerna
import { Group } from '../group/';

// TODO Should be auto-generated
export class WebRTCApi extends Api {

}

export function WebRTCApiFactory(client: ZetaPushClient, zone: NgZone): WebRTCApi {
  return createApi(client, zone, WebRTCApi) as WebRTCApi;
}

export const WebRTCApiProvider = {
  provide: WebRTCApi, useFactory: WebRTCApiFactory, deps: [ ZetaPushClient, NgZone ]
};