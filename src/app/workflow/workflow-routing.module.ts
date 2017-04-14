import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState } from '../core';

import { WorkflowLayoutComponent } from './workflow-layout/workflow-layout.component';
import { ListWorkflowViewComponent } from './list-workflow-view/list-workflow-view.component';
import { DetailsWorkflowViewComponent } from './details-workflow-view/details-workflow-view.component';

const routes: Routes = [{
  path: 'workflow',
  component: WorkflowLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  children: [
    { path: '', redirectTo: 'list/all', pathMatch: 'full' },
    { path: 'list/all', component: ListWorkflowViewComponent },
    { path: 'details/:id', component: DetailsWorkflowViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorkflowRoutingModule {
  constructor(core: CoreState) {
    console.log('WorkflowRoutingModule::constructor', core);
    core.register({
      name: 'workflow',
      path: '/workflow'
    });
  }
}
