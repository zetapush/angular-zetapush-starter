import { ZetaPushClient } from './core';
import { services } from 'zetapush-js';

export class Api extends services.Macro {
  static DEFAULT_DEPLOYMENT_ID = services.Macro.DEFAULT_DEPLOYMENT_ID;
}

export function createApi(client: ZetaPushClient, Api) {
  return client.createAsyncMacroService({
    Type: Api
  });
}
