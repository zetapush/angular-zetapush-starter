import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent } from '../router';

import { CreateGroupViewComponent } from './create-group-view/create-group-view.component';
import { ListUserGroupViewComponent } from './list-user-group-view/list-user-group-view.component';
import { DetailsGroupViewComponent } from './details-group-view/details-group-view.component';

const routes: Routes = [{
  path: 'group',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: [
      { path: 'create', name: 'group/create' },
      { path: 'list/mine', name: 'group/list/mine' },
    ]
  },
  children: [
    { path: '', redirectTo: 'list/mine', pathMatch: 'full' },
    { path: 'create', component: CreateGroupViewComponent },
    { path: 'list/mine', component: ListUserGroupViewComponent },
    { path: 'details/:id', component: DetailsGroupViewComponent }
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
