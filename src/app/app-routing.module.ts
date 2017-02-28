import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginViewComponent } from './login-view/login-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent }
];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
