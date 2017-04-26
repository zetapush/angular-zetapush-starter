import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { GroupModule } from '../group';
// TODO Refactor with Lerna
import { UserModule } from '../user';

import { OrganizationRoutingModule } from './organization-routing.module';

import { OrganizationApiProvider } from './organization-api.service';

import { ListOrganizationViewComponent } from './list-organization-view/list-organization-view.component';
import { ListUserOrganizationViewComponent } from './list-user-organization-view/list-user-organization-view.component';
import { DetailsOrganizationViewComponent } from './details-organization-view/details-organization-view.component';
import { DetailsOrganizationComponent } from './details-organization/details-organization.component';
import {
  AutocompleteOrganizationMembersDialogComponent
} from './autocomplete-organization-members-dialog/autocomplete-organization-members-dialog.component';
import {
  AddGroupMemberViewActionComponent
} from './add-group-member-view-action/add-group-member-view-action.component';

@NgModule({
  declarations: [
    AutocompleteOrganizationMembersDialogComponent,
    DetailsOrganizationViewComponent,
    DetailsOrganizationComponent,
    ListOrganizationViewComponent,
    ListUserOrganizationViewComponent,
    AddGroupMemberViewActionComponent
  ],
  entryComponents: [
    AddGroupMemberViewActionComponent
  ],
  exports: [
    OrganizationRoutingModule,

    AutocompleteOrganizationMembersDialogComponent,
    DetailsOrganizationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    UiModule,
    GroupModule,
    UserModule,

    OrganizationRoutingModule
  ],
  providers: [
    OrganizationApiProvider
  ]
})
export class OrganizationModule { }
