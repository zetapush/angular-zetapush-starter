import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';
import { services } from 'zetapush-js';

export abstract class FileCallbackApi {
  onThumbnailCallback: Observable<any>;
}

export function FileCallbackApiFactory(client: ZetaPushClient, zone: NgZone): FileCallbackApi {
  const METHOD_PATTERN = /^core_file__(\w+)$/;
  const methods = ['core_file__onThumbnailCallback'];
  const extensions = {} as FileCallbackApi;
  const listener = methods.reduce((reducer, method) => {
    const source = new Observable((observer) => {
      reducer[method] = ({ data }: { data: { errors: Array<any>, result: any } }) => {
        console.log(`Api::${method}`, data);
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
    const [, channel] = METHOD_PATTERN.exec(method);
    extensions[channel] = published;
    published.connect();
    return reducer;
  }, {});
  // Create callback service
  const api = client.createService({
    Type: services.Macro,
    deploymentId: 'macro_1',
    listener
  });
  return Object.assign(api, extensions) as FileCallbackApi;
}

export const FileCallbackApiProvider = {
  provide: FileCallbackApi, useFactory: FileCallbackApiFactory, deps: [ ZetaPushClient, NgZone ]
};
