import { NgZone } from '@angular/core';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

interface WorkflowStep {
  id: string;
  name: string;
  contexts: Array<any>;
}

export interface Workflow {
  id: string;
  steps: Array<WorkflowStep>;
}

// TODO Should be auto-generated
export class WorkflowApi extends Api {
  static mock(index): Workflow {
    return {
      id: `wrkflw-${index}`,
      steps: [
        {
          id: `wrkflw-${index}-step-0`,
          name: 'TODO',
          contexts: [
            { id: `wrkflw-${index}-context-0`, status: 'assignment', name: 'Test' }
          ]
        },
        {
          id: `wrkflw-${index}-step-1`,
          name: 'In Progress',
          contexts: [
            { id: `wrkflw-${index}-context-1`, status: 'announcement', name: 'Support' },
            { id: `wrkflw-${index}-context-2`, status: 'assignment_turned_in', name: 'Debug' }
          ]
        },
        {
          id: `wrkflw-${index}-step-2`,
          name: 'Done',
          contexts: [
            { id: `wrkflw-${index}-context-3`, status: 'bug_report', name: 'Bug' }
          ]
        }
      ]
    }
  }
}

export function WorkflowApiFactory(client: ZetaPushClient, zone: NgZone): WorkflowApi {
  return createApi(client, zone, WorkflowApi) as WorkflowApi;
}

export const WorkflowApiProvider = {
  provide: WorkflowApi, useFactory: WorkflowApiFactory, deps: [ ZetaPushClient, NgZone ]
};
