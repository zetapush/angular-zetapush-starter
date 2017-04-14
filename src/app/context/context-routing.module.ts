import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState } from '../core';

import { ContextLayoutComponent } from './context-layout/context-layout.component';
import { ListContextViewComponent } from './list-context-view/list-context-view.component';
import { DetailsContextViewComponent } from './details-context-view/details-context-view.component';

const routes: Routes = [{
  path: 'context',
  component: ContextLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  children: [
    { path: '', redirectTo: 'list/all', pathMatch: 'full' },
    { path: 'list/all', component: ListContextViewComponent },
    { path: 'details/:id', component: DetailsContextViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContextRoutingModule {
  constructor(core: CoreState) {
    console.log('ContextRoutingModule::constructor', core);
    core.register({
      name: 'context',
      path: '/context'
    });
  }
}
