import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Context, ContextTemplate, WorkflowStateDefinition, WorkflowApi } from '../workflow-api.service';

@Component({
  selector: 'zp-details-workflow-view',
  template: `
    <h1 class="Title">details-workflow-view <md-icon (click)="onAddContextClick()">add</md-icon></h1>
    <section class="Workflow" fxLayout="row" fxLayoutAlign="space-around center" fxFill>
      <div class="WorkflowStep" fxFlex="getFlexValue(workflow)" *ngFor="let state of contextTemplate.template.states; let i = index">
        <div class="WorkflowStep__Details">
          <h4>{{state.stateName}}<span class="Counter">{{ states[state.stateId] && states[state.stateId].length}}</span></h4>
        </div>
        <div class="WorkflowStep__ContextList"
          dnd-droppable
          [allowDrop]="allowDropFunction(state)"
          (onDropSuccess)="onDropSuccess(state, $event.dragData)">
          <div class="WorkflowContext" *ngFor="let context of states[state.stateId]; let x = index"
            dnd-draggable [dragData]="context">
            <span class="WorkflowContext__Icon">
              <md-icon>{{context.fields.icon}}</md-icon>
            </span>
            <div>{{context.fields.title}}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      height: calc(100% - 11rem);
    }
    .Title {
      margin: 0;
      height: 3rem;
    }
    .Workflow {
      background-color: #FFF;
    }
    .WorkflowStep {
      height: 100%;
      background-color: #fafbfc;
      border: 1px #e1e4e8 solid;
      border-radius: 3px ;
      margin: 0 0.5rem;
    }
    .WorkflowStep__Details {
      padding: 10px 16px;
      background-color: #fafbfc;
      border-bottom: 1px #e1e4e8 solid;
    }
    .WorkflowStep__Title {
      font-size: 1.4rem;
      margin: 0;
      display: inline;
      vertical-align: middle;
    }
    .WorkflowStep__ContextList {
      padding: 8px;
      height: 100%;
    }
    .WorkflowContext {
      cursor: move;
      position: relative;
      transition: transform 500ms;
      padding: 12px 10px 12px 38px;
      margin: 8px 0;
      background-color: #fff ;
      border: 1px #e1e4e8 solid ;
      border-radius: 3px ;
    }
    .WorkflowContext__Icon {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .Counter {
      display: inline-block;
      padding: 2px 5px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
      color: #586069;
      background-color: rgba(27,31,35,0.08);
      border-radius: 20px;

      margin-left: 4px;
    }
  `]
})
export class DetailsWorkflowViewComponent implements OnDestroy, OnInit {

  private subscriptions: Array<Subscription> = [];

  contextTemplate: ContextTemplate = WorkflowApi.mock(0);
  states: { [key: string]: Context[] } = {};
  permissions: { [key: string]: string[] } = {};

  constructor(private api: WorkflowApi) {
    this.subscriptions.push(api.onCreateTrelloContext.subscribe(() => this.getMyContextList()));
    this.subscriptions.push(api.onTransitionContext.subscribe(() => this.getMyContextList()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.api.getContextTemplate({ contextTemplateId: 'trello' })
        .then((contextTemplate) => this.onGetContextTemplate(contextTemplate))
        .then(() => this.getMyContextList());
  }

  onAddContextClick() {
    console.log('DetailsWorkflowViewComponent::addContext');
    this.api.createTrelloContext();
  }

  onGetContextTemplate(contextTemplate: ContextTemplate) {
    console.log('DetailsWorkflowViewComponent::onGetContextTemplate', contextTemplate);
    this.contextTemplate = contextTemplate;
    this.permissions = contextTemplate.template.transitions.reduce((acc, transition) => {
      acc[transition.from] = acc[transition.from] || [];
      acc[transition.from].push(transition.to);
      return acc
    }, {});
  }

  onGetContextList(list: Array<Context>) {
    console.log('DetailsWorkflowViewComponent::onGetContextList', list);
    this.states = this.contextTemplate.template.states.reduce((acc, value) => {
      acc[value.stateId] = [];
      return acc;
    }, {});
    list.forEach((context) => this.states[context.state].push(context));
  }

  getFlexValue(workflow: ContextTemplate) {
    const states = workflow.template.states.length || 1;
    return Math.trunc(100 / states);
  }

  onDropSuccess(state: WorkflowStateDefinition, context) {
    console.log('DetailsWorkflowViewComponent::onDropSuccess', state, context);
    this.api.transitionContext({
      contextId: context.__key,
      newState: state.stateId
    });
  }

  allowDropFunction(state: WorkflowStateDefinition) {
    return (context: Context) => {
      return this.permissions[context.state] && this.permissions[context.state].indexOf(state.stateId) > -1;
    };
  }

  private getMyContextList() {
    return this.api.getMyContextList().then(({ list }) => this.onGetContextList(list));
  }

}
