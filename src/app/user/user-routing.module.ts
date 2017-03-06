import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateConnected, CoreState } from '../core';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { CreateUserViewComponent } from './create-user-view/create-user-view.component';
import { ListUserViewComponent } from './list-user-view/list-user-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';

const routes: Routes = [{
  path: 'user',
  component: UserLayoutComponent,
  canActivate: [ CanActivateConnected ],
  children: [
    { path: '', redirectTo: 'create', pathMatch: 'full' },
    { path: 'create', component: CreateUserViewComponent },
    { path: 'list', component: ListUserViewComponent }
  ]
}, {
  path: 'register',
  component: RegisterViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule {
  constructor(core: CoreState) {
    console.log('UserRoutingModule::constructor', core);
    core.register({
      name: 'user',
      path: '/user'
    });
  }
}
