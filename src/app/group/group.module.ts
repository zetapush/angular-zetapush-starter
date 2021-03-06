import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { UserModule } from '../user';

import { GroupRoutingModule } from './group-routing.module';

import { GroupApiProvider } from './group-api.provider';

import { GroupLayoutComponent } from './group-layout/group-layout.component';

import { ListGroupComponent } from './list-group/list-group.component';
import { ListUserGroupViewComponent } from './list-user-group-view/list-user-group-view.component';
import { DetailsGroupViewComponent } from './details-group-view/details-group-view.component';
import { DetailsGroupComponent } from './details-group/details-group.component';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { CreateGroupViewComponent } from './create-group-view/create-group-view.component';

@NgModule({
  declarations: [
    GroupLayoutComponent,
    ListGroupComponent,
    ListUserGroupViewComponent,
    DetailsGroupViewComponent,
    DetailsGroupComponent,
    CreateGroupFormComponent,
    CreateGroupViewComponent,
  ],
  exports: [
    GroupRoutingModule,

    DetailsGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    UiModule,
    UserModule,

    GroupRoutingModule
  ],
  providers: [
    GroupApiProvider
  ]
})
export class GroupModule { }
