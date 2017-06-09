import { Component, OnInit } from '@angular/core';

import { WorkflowApi } from '../workflow-api.service';

@Component({
  selector: 'zp-list-workflow-view',
  template: `
    <h1>list-workflow-view</h1>
    <md-list>
      <md-list-item *ngFor="let template of templates">
        <a [routerLink]="['/workflow/details/', template.templateName]">{{template.templateName}}</a>
      </md-list-item>
    </md-list>
  `,
  styles: [
    `

  `,
  ],
})
export class ListWorkflowViewComponent implements OnInit {
  templates = [];

  constructor(private api: WorkflowApi) {}

  async ngOnInit() {
    const { list: templates } = await this.api.getContextTemplateList();
    this.templates = templates;
  }
}
