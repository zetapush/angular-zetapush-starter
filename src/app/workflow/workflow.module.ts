import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { UserModule } from '../user';

import { WorkflowRoutingModule } from './workflow-routing.module';

import { WorkflowApi, WorkflowApiProvider } from './workflow-api.service';

import { ListWorkflowViewComponent } from './list-workflow-view/list-workflow-view.component';
import { DetailsWorkflowViewComponent } from './details-workflow-view/details-workflow-view.component';
import { DetailsWorkflowComponent } from './details-workflow/details-workflow.component';

import { EmbeddedSortableComponent } from './embedded-sortable.component';

@NgModule({
  declarations: [
    ListWorkflowViewComponent,
    DetailsWorkflowViewComponent,
    DetailsWorkflowComponent,

    EmbeddedSortableComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    DndModule.forRoot(),

    CoreModule,
    UiModule,
    UserModule,

    WorkflowRoutingModule
  ],
  providers: [
    WorkflowApiProvider
  ]
})
export class WorkflowModule {
  constructor(api: WorkflowApi) {
    window['WorkflowApi'] = api;
  }
}
