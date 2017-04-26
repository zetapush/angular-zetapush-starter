import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, IsWeaklyConnected, ViewActionItem, ViewActionRegistry } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';

import { CreateUserViewComponent } from './create-user-view/create-user-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { DetailsUserViewComponent } from './details-user-view/details-user-view.component';
import { UserBadgeViewActionComponent } from './user-badge-view-action/user-badge-view-action.component';
import { UserDisconnectViewActionComponent } from './user-disconnect-view-action/user-disconnect-view-action.component';

const routes: Routes = [{
  path: 'user',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: [
      { path: 'create', name: 'user/create' }
    ]
  },
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
  constructor(core: RouterState, registry: ViewActionRegistry) {
    console.log('UserRoutingModule::constructor', core);
    core.register({
      name: 'user',
      path: '/user'
    });
    registry.setActionsByView(RouterLayoutComponent, [
      new ViewActionItem(UserBadgeViewActionComponent),
      new ViewActionItem(UserDisconnectViewActionComponent)
    ]);
  }
}
