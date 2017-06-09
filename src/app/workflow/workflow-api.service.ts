import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

export interface ContextTemplate {
  info: ContextTemplateInfo;
  fields: ContextTemplateField[];
  template: WorkflowTemplate;
}

interface ContextTemplateInfo extends ContextTemplateKey {
  name: string;
  defaultState: string;
  workflowTemplateName: string;
  groups: string[];
}

interface ContextTemplateField {
  name: string;
  prettyName: string;
  mandatory: boolean;
  type: string;
  typeConfig: { [key: string]: any };
}

interface ContextTransitionRequest {
  contextId: string;
  newState: string;
}

interface ContextTemplateKey {
  contextTemplateId: string;
}

interface WorkflowTemplate {
  states: WorkflowStateDefinition[];
  templateName: string;
  transitions: WorkflowTransitionDefinition[];
}

interface ServiceVerbCall {
  parameter: { [key: string]: any };
  deploymentId: string;
  verb: string;
  loud: boolean;
}

export interface WorkflowStateDefinition {
  call: ServiceVerbCall;
  stateId: string;
  stateName: string;
}

interface WorkflowTransitionDefinition {
  from: string;
  to: string;
}

interface ContextInfo {
  contextId: string;
  creation: number;
}

export interface Context {
  info: ContextInfo;
  fields: { [key: string]: any };
  state: string;
}

interface ContextTransitionRequest {
  contextId: string;
  newState: string;
}

// TODO Should be auto-generated
export class WorkflowApi extends Api {
  onCreateTrelloContext: Observable<ContextInfo>;
  onTransitionContext: Observable<ContextTransitionRequest>;

  static mock(index): ContextTemplate {
    return {
      info: {
        name: '',
        defaultState: '',
        workflowTemplateName: '',
        groups: [],
        contextTemplateId: '',
      },
      fields: [],
      template: {
        states: [],
        templateName: 'trello',
        transitions: [],
      },
    };
  }

  getContextTemplateList(): Promise<{ list: any[] }> {
    return this.$publish('getContextTemplateList', {});
  }

  getContextTemplate(key: ContextTemplateKey): Promise<ContextTemplate> {
    return this.$publish('getContextTemplate', key);
  }

  getMyContextList(): Promise<{ list: Context[] }> {
    return this.$publish('getMyContextList', {});
  }

  createTrelloContext(): Promise<ContextInfo> {
    return this.$publish('createTrelloContext', {});
  }

  transitionContext(
    request: ContextTransitionRequest,
  ): Promise<ContextTransitionRequest> {
    return this.$publish('transitionContext', request);
  }
}

export function WorkflowApiFactory(
  client: ZetaPushClient,
  zone: NgZone,
): WorkflowApi {
  return createApi(client, zone, WorkflowApi) as WorkflowApi;
}

export const WorkflowApiProvider = {
  provide: WorkflowApi,
  useFactory: WorkflowApiFactory,
  deps: [ZetaPushClient, NgZone],
};
