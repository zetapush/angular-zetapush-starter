import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AutocompleteUserDialogComponent, DialogUserListComponent } from './autocomplete-user-dialog/autocomplete-user-dialog.component';
import { DetailsUserViewComponent } from './details-user-view/details-user-view.component';
import { DetailsUserComponent } from './details-user/details-user.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    CreateUserViewComponent,
    ListUserViewComponent,
    RegisterViewComponent,
    AutocompleteUserDialogComponent,
    DialogUserListComponent,
    CreateUserFormComponent,
    DetailsUserViewComponent,
    DetailsUserComponent
  ],
  entryComponents: [
    DialogUserListComponent
  ],
  exports: [
    UserRoutingModule,

    AutocompleteUserDialogComponent,
    CreateUserFormComponent,
    DetailsUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,

    CoreModule,

    UserRoutingModule
  ],
  providers: [
    UserApiProvider
  ]
})
export class UserModule { }
