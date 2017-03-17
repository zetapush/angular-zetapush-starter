import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsSimplyConnected, CoreState } from '../core';

import { GroupLayoutComponent } from './group-layout/group-layout.component';
import { CreateGroupViewComponent } from './create-group-view/create-group-view.component';
import { ListUserGroupViewComponent } from './list-user-group-view/list-user-group-view.component';
import { DetailsGroupViewComponent } from './details-group-view/details-group-view.component';

const routes: Routes = [{
  path: 'group',
  component: GroupLayoutComponent,
  canActivate: [ IsSimplyConnected ],
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
