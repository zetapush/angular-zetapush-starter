import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsSimplyConnected, CoreState } from '../core';

import { RoleLayoutComponent } from './role-layout/role-layout.component';
import { CreateRoleViewComponent } from './create-role-view/create-role-view.component';
import { ListRoleViewComponent } from './list-role-view/list-role-view.component';
import { DetailsRoleViewComponent } from './details-role-view/details-role-view.component';

const routes: Routes = [{
  path: 'role',
  component: RoleLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'create', component: CreateRoleViewComponent },
    { path: 'list', component: ListRoleViewComponent },
    { path: 'details/:name', component: DetailsRoleViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoleRoutingModule {
  constructor(core: CoreState) {
    console.log('RoleRoutingModule::constructor', core);
    core.register({
      name: 'role',
      path: '/role'
    });
  }
}
