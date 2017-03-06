import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateConnected } from '../core';

import { RoleLayoutComponent } from './role-layout/role-layout.component';
import { ListRoleViewComponent } from './list-role-view/list-role-view.component';

const routes: Routes = [{
  path: 'role',
  component: RoleLayoutComponent,
  canActivate: [ CanActivateConnected ],
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListRoleViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoleRoutingModule { }
