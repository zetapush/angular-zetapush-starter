import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

interface ContextTransitionRequest {
  contextId: string;
  newState: string;
}

interface WorkflowContext {
  fields: { [key: string]: any; };
  info: { contextId: string; create: number };
  state: string;
  __key: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  state: string;
  contexts: Array<any>;
}

export interface Workflow {
  id: string;
  steps: Array<WorkflowStep>;
}

// TODO Should be auto-generated
export class WorkflowApi extends Api {

  onCreateTrelloContext: Observable<any>;
  onUpdateTrelloContext: Observable<any>;

  static mock(index): Workflow {
    return {
      id: `wrkflw-${index}`,
      steps: [
        {
          id: `wrkflw-${index}-step-0`,
          name: 'TODO',
          state: 'TODO',
          contexts: []
        },
        {
          id: `wrkflw-${index}-step-1`,
          name: 'In Progress',
          state: 'IN_PROGRESS',
          contexts: []
        },
        {
          id: `wrkflw-${index}-step-2`,
          name: 'Done',
          state: 'DONE',
          contexts: []
        }
      ]
    }
  }

  getMyContextList() {
    return this.$publish('getMyContextList', {});
  }
  createTrelloContext() {
    return this.$publish('createTrelloContext', {})
  }
  updateTrelloContext(request: ContextTransitionRequest) {
    return this.$publish('updateTrelloContext', request)
  }
}

export function WorkflowApiFactory(client: ZetaPushClient, zone: NgZone): WorkflowApi {
  return createApi(client, zone, WorkflowApi) as WorkflowApi;
}

export const WorkflowApiProvider = {
  provide: WorkflowApi, useFactory: WorkflowApiFactory, deps: [ ZetaPushClient, NgZone ]
};
