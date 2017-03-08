import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZetaPushModule } from '../zetapush';

import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';

import { CanActivateConnected } from './can-activate-connected.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  { path: 'home', component: HomeViewComponent, canActivate: [ CanActivateConnected ] }
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
export class CoreRoutingModule {}
