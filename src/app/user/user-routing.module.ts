import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateConnected } from '../core';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { CreateUserViewComponent } from './create-user-view/create-user-view.component';

const routes: Routes = [{
  path: 'user',
  component: UserLayoutComponent,
  canActivate: [ CanActivateConnected ],
  children: [
    { path: '', redirectTo: 'create', pathMatch: 'full' },
    { path: 'create', component: CreateUserViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule { }
