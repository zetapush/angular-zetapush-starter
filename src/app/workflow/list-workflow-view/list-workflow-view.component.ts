import { Component } from '@angular/core';

import { Workflow, WorkflowApi } from '../workflow-api.service';

@Component({
  selector: 'zp-list-workflow-view',
  template: `
    <h1>list-workflow-view</h1>
    <md-list>
      <md-list-item *ngFor="let workflow of workflows">
        <a [routerLink]="['/workflow/details/', workflow.id]">{{workflow.id}}</a>
      </md-list-item>
    </md-list>
  `,
  styles: [`

  `]
})
export class ListWorkflowViewComponent {

  workflows: Array<Workflow> = Array.from({ length: 3 }).map((value, index) => WorkflowApi.mock(index))

}
