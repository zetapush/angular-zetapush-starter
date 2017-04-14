import { NgZone } from '@angular/core';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

// TODO Should be auto-generated
export class WorkflowApi extends Api {

}

export function WorkflowApiFactory(client: ZetaPushClient, zone: NgZone): WorkflowApi {
  return createApi(client, zone, WorkflowApi) as WorkflowApi;
}

export const WorkflowApiProvider = {
  provide: WorkflowApi, useFactory: WorkflowApiFactory, deps: [ ZetaPushClient, NgZone ]
};
