
import { NgZone } from '@angular/core';

import { services } from 'zetapush-js';

import { ZetaPushClient } from './core';

export class Api extends services.Macro {
  static DEFAULT_DEPLOYMENT_ID = services.Macro.DEFAULT_DEPLOYMENT_ID;
}

export function createApi(client: ZetaPushClient, zone: NgZone, Api) {
  const api = client.createAsyncMacroService({
    Type: Api
  });
  const $publish = api.$publish;
  api.$publish = (method: string, parameters: any, hardFail?: boolean, debug?: number) => new Promise<any>((resolve, reject) => {
    const onSuccess = (message) => zone.run(() => {
      resolve(message);
    });
    const onError = (errors) => zone.run(() => {
      reject(errors);
    });
    $publish(method, parameters, hardFail, debug).then(onSuccess, onError);
  });
  return api;
}
