import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';

import { UserRoutingModule } from './user-routing.module';

import { UserApiProvider } from './user-api.provider';

import { UserLayoutComponent } from './user-layout/user-layout.component';

import { CreateUserViewComponent } from './create-user-view/create-user-view.component';
import { ListUserViewComponent } from './list-user-view/list-user-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    CreateUserViewComponent,
    ListUserViewComponent,
    RegisterViewComponent,
    CreateUserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
    UserRoutingModule
  ],
  exports: [
    UserRoutingModule
  ],
  providers: [
    UserApiProvider
  ]
})
export class UserModule { }
