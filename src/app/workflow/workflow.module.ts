import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { UserModule } from '../user';

import { WorkflowRoutingModule } from './workflow-routing.module';

import { WorkflowApiProvider } from './workflow-api.service';

import { WorkflowLayoutComponent } from './workflow-layout/workflow-layout.component';

import { ListWorkflowViewComponent } from './list-workflow-view/list-workflow-view.component';
import { DetailsWorkflowViewComponent } from './details-workflow-view/details-workflow-view.component';
import { DetailsWorkflowComponent } from './details-workflow/details-workflow.component';

@NgModule({
  declarations: [
    WorkflowLayoutComponent,
    ListWorkflowViewComponent,
    DetailsWorkflowViewComponent,
    DetailsWorkflowComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    UiModule,
    UserModule,

    WorkflowRoutingModule
  ],
  providers: [
    WorkflowApiProvider
  ]
})
export class WorkflowModule { }
