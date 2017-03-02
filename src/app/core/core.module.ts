import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { CoreRoutingModule } from './core-routing.module';

import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';

import { CanActivateConnected } from './can-activate-connected.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CoreRoutingModule
  ],
  declarations: [
    LoginViewComponent,
    HomeViewComponent
  ],
  exports: [
    CoreRoutingModule
  ],
  providers: [
    CanActivateConnected
  ]
})
export class CoreModule { }
