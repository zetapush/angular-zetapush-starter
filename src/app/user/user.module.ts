import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserLayoutComponent } from './user-layout/user-layout.component';

import { CreateUserViewComponent } from './create-user-view/create-user-view.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    CreateUserViewComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    UserRoutingModule
  ]
})
export class UserModule { }
