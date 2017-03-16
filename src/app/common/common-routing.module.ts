import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { ZetaPushModule } from '../zetapush';
// TODO Refactor with Lerna
import { IsSimplyConnected } from '../core';

import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  { path: 'home', component: HomeViewComponent, canActivate: [ IsSimplyConnected ] },
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
