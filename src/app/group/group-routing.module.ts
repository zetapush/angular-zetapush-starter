import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsSimplyConnected, CoreState } from '../core';

import { GroupLayoutComponent } from './group-layout/group-layout.component';
import { ListGroupViewComponent } from './list-group-view/list-group-view.component';
import { DetailsGroupViewComponent } from './details-group-view/details-group-view.component';

const routes: Routes = [{
  path: 'group',
  component: GroupLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListGroupViewComponent },
    { path: 'details/:name', component: DetailsGroupViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GroupRoutingModule {
  constructor(core: CoreState) {
    console.log('GroupRoutingModule::constructor', core);
    core.register({
      name: 'group',
      path: '/group'
    });
  }
}
