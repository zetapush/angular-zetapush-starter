import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { GroupModule } from '../group';
// TODO Refactor with Lerna
import { UserModule } from '../user';

import { OrganizationRoutingModule } from './organization-routing.module';

import { OrganizationApiProvider } from './organization-api.provider';

import { OrganizationLayoutComponent } from './organization-layout/organization-layout.component';

import { ListOrganizationViewComponent } from './list-organization-view/list-organization-view.component';
import { ListUserOrganizationViewComponent } from './list-user-organization-view/list-user-organization-view.component';
import { DetailsOrganizationViewComponent } from './details-organization-view/details-organization-view.component';
import { DetailsOrganizationComponent } from './details-organization/details-organization.component';

@NgModule({
  declarations: [
    OrganizationLayoutComponent,
    ListOrganizationViewComponent,
    ListUserOrganizationViewComponent,
    DetailsOrganizationViewComponent,
    DetailsOrganizationComponent
  ],
  exports: [
    OrganizationRoutingModule,

    DetailsOrganizationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,

    CoreModule,
    GroupModule,
    UserModule,

    OrganizationRoutingModule
  ],
  providers: [
    OrganizationApiProvider
  ]
})
export class OrganizationModule { }
