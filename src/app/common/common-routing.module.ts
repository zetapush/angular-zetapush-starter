import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZetaPushModule } from 'zetapush-angular';

// TODO Refactor with Lerna
import { IsSimplyConnected } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';

import { HomeViewComponent } from './home-view/home-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  {
    path: 'home',
    component: RouterLayoutComponent,
    canActivate: [ IsSimplyConnected ],
    children: [
      { path: '', component: HomeViewComponent }
    ]
  },
  { path: '**', component: NotFoundViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ZetaPushModule
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class CommonRoutingModule {}
