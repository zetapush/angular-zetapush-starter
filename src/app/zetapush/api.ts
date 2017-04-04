import { NgZone } from '@angular/core';

import { services } from 'zetapush-js';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';

import { ZetaPushClient } from './core';

const toPascalCase = (word = '') => `${word.charAt(0).toUpperCase()}${word.substring(1)}`;

const getExtensionsAndListener = (Class: any, zone: NgZone) => {
  const filter = (element) => element !== 'constructor';
  const methods = Object.getOwnPropertyNames(Class.prototype).filter(filter);
  const extensions = {};
  const listener = methods.reduce((reducer, method) => {
    const source = new Observable((observer) => {
      reducer[method] = ({ data }: { data: { errors: Array<any>, result: any } }) => {
        console.log(`Api::on${toPascalCase(method)}`, data);
        zone.run(() => {
          const { errors, result } = data;
          if (errors.length) {
            observer.error(result);
          } else {
            observer.next(result);
          }
        });
      };
    });
    const published = source.publish();
    extensions[`on${toPascalCase(method)}`] = published;
    published.connect();
    return reducer;
  }, {});
  return { extensions , listener };
};

export class Api extends services.Macro {
  $getUserId(): string {
    return '<abstract>';
  }
}

export function createApi(client: ZetaPushClient, zone: NgZone, Api) {
  const { extensions , listener } = getExtensionsAndListener(Api, zone);
  const api = client.createAsyncMacroService({
    Type: Api,
    listener
  });
  const $publish = api.$publish;
  api.$publish = (method: string, parameters: any, hardFail?: boolean, debug?: number) => new Promise<any>((resolve, reject) => {
    console.warn(`Api::${method}`, parameters);
    const onSuccess = (message) => zone.run(() => resolve(message));
    const onError = (errors) => zone.run(() => reject(errors));
    $publish(method, parameters, hardFail, debug).then(onSuccess, onError);
  });
  return Object.assign(api, extensions, {
    $getUserId: () => client.getUserId()
  });
}
