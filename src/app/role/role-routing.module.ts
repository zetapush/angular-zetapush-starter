import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';

import { CreateRoleViewComponent } from './create-role-view/create-role-view.component';
import { ListRoleViewComponent } from './list-role-view/list-role-view.component';
import { ListUserRoleViewComponent } from './list-user-role-view/list-user-role-view.component';
import { DetailsRoleViewComponent } from './details-role-view/details-role-view.component';
import { PermissionGridViewComponent } from './permission-grid-view/permission-grid-view.component';

const routes: Routes = [{
  path: 'role',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: [
      { path: 'create', name: 'role/create' },
      { path: 'list/mine', name: 'role/list/mine' },
      { path: 'grid', name: 'role/grid' }
    ]
  },
  children: [
    { path: '', redirectTo: 'list/mine', pathMatch: 'full' },
    { path: 'create', component: CreateRoleViewComponent },
    { path: 'list/all', component: ListRoleViewComponent },
    { path: 'list/mine', component: ListUserRoleViewComponent },
    { path: 'details/:name', component: DetailsRoleViewComponent },
    { path: 'grid', component: PermissionGridViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoleRoutingModule {
  constructor(core: RouterState) {
    console.log('RoleRoutingModule::constructor', core);
    core.register({
      name: 'role',
      path: '/role'
    });
  }
}
