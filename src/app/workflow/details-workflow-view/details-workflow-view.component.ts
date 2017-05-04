import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Workflow, WorkflowApi } from '../workflow-api.service';

@Component({
  selector: 'zp-details-workflow-view',
  template: `
    <h1 class="Title">details-workflow-view <md-icon (click)="onAddContextClick()">add</md-icon></h1>
    <section class="Workflow" fxLayout="row" fxLayoutAlign="space-around center" fxFill>
      <div class="WorkflowStep" fxFlex="getFlexValue(workflow)" *ngFor="let step of workflow.steps; let i = index">
        <div class="WorkflowStep__Details">
          <h4>{{step.name}}<span class="Counter">{{step.contexts.length}}</span></h4>
        </div>
        <div class="WorkflowStep__ContextList"
          dnd-droppable
          [allowDrop]="allowDropFunction(step)"
          (onDropSuccess)="onDropSuccess(step, $event.dragData)">
          <div class="WorkflowContext" *ngFor="let context of step.contexts; let x = index"
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

  workflow: Workflow = WorkflowApi.mock(0);

  constructor(private api: WorkflowApi) {
    this.subscriptions.push(api.onCreateTrelloContext.subscribe(() => {
      this.api.getMyContextList().then(({ list }) => this.onGetContextList(list));
    }));
    this.subscriptions.push(api.onUpdateTrelloContext.subscribe(() => {
      this.api.getMyContextList().then(({ list }) => this.onGetContextList(list));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.api.getMyContextList().then(({ list }) => this.onGetContextList(list));
  }

  onAddContextClick() {
    console.log('DetailsWorkflowViewComponent::addContext');
    this.api.createTrelloContext();
  }

  onGetContextList(list: Array<any>) {
    console.log('DetailsWorkflowViewComponent::onGetContextList', list);
    const steps = this.workflow.steps.reduce((acc, value) => {
      value.contexts.length = 0;
      acc[value.state] = value.contexts;
      return acc;
    }, {});
    list.forEach((context) => steps[context.state].push(context));
  }

  getFlexValue(workflow: Workflow) {
    const steps = workflow.steps.length || 1;
    return Math.trunc(100 / steps);
  }

  onDropSuccess(step, context) {
    console.log('DetailsWorkflowViewComponent::onDropSuccess', step, context);
    this.api.updateTrelloContext({
      contextId: context.__key,
      newState: step.state
    });
  }

  allowDropFunction(step) {
    const permissions = {
      'TODO': ['IN_PROGRESS'],
      'IN_PROGRESS': ['TODO', 'DONE'],
      'DONE': []
    }
    return (dragData: any) => {
      return permissions[dragData.state].indexOf(step.state) > -1;
    };
  }

}
