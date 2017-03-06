import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserApiProvider } from './user-api.service';

import { UserRoutingModule } from './user-routing.module';

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
