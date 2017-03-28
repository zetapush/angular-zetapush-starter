import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsSimplyConnected, IsWeaklyConnected, CoreState } from '../core';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { CreateUserViewComponent } from './create-user-view/create-user-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { DetailsUserViewComponent } from './details-user-view/details-user-view.component';

const routes: Routes = [{
  path: 'user',
  component: UserLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  children: [
    { path: '', redirectTo: 'create', pathMatch: 'full' },
    { path: 'create', component: CreateUserViewComponent },
    { path: 'details/:userKey', component: DetailsUserViewComponent }
  ]
}, {
  path: 'register',
  component: RegisterViewComponent,
  canActivate: [ IsWeaklyConnected ]
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
