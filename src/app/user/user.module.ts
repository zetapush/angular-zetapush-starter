import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';

import { UserRoutingModule } from './user-routing.module';

import { UserApiProvider } from './user-api.service';
import { UserCache } from './user-cache.service';

import { CreateUserViewComponent } from './create-user-view/create-user-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { AutocompleteUserDialogComponent, DialogUserListComponent } from './autocomplete-user-dialog/autocomplete-user-dialog.component';
import { DetailsUserViewComponent } from './details-user-view/details-user-view.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { UserBadgeComponent } from './user-badge/user-badge.component';
import { UserDisconnectComponent } from './user-disconnect/user-disconnect.component';
import { UserLinkComponent } from './user-link/user-link.component';

@NgModule({
  declarations: [
    CreateUserViewComponent,
    RegisterViewComponent,
    AutocompleteUserDialogComponent,
    DialogUserListComponent,
    CreateUserFormComponent,
    DetailsUserViewComponent,
    DetailsUserComponent,
    UserBadgeComponent,
    UserDisconnectComponent,
    UserLinkComponent
  ],
  entryComponents: [
    DialogUserListComponent
  ],
  exports: [
    UserRoutingModule,

    AutocompleteUserDialogComponent,
    CreateUserFormComponent,
    DetailsUserComponent,
    DialogUserListComponent,
    UserBadgeComponent,
    UserDisconnectComponent,
    UserLinkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    UiModule,

    UserRoutingModule
  ],
  providers: [
    UserApiProvider,
    UserCache
  ]
})
export class UserModule {
  constructor(cache: UserCache) {
    window['UserCache'] = cache;
  }
}
