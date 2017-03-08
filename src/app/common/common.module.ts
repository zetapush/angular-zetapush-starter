import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

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
    FormsModule,
    MaterialModule,
    CommonRoutingModule
  ],
  exports: [
    NgCommonModule,
    FormsModule,
    MaterialModule,
    CommonRoutingModule
  ]
})
export class CommonModule { }
