import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

// TODO Refactor with Lerna
import { CoreModule } from '../core';

import { CommonRoutingModule } from './common-routing.module';

import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';

@NgModule({
  declarations: [
    LoginViewComponent,
    HomeViewComponent,
    NotFoundViewComponent
  ],
  imports: [
    NgCommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    CoreModule,
    CommonRoutingModule
  ],
  exports: [
    NgCommonModule,
    FormsModule,
    MaterialModule,

    CommonRoutingModule
  ],
  providers: [

  ]
})
export class CommonModule { }
