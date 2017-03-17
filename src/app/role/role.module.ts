import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { GroupModule } from '../group';

import { RoleRoutingModule } from './role-routing.module';

import { RoleApiProvider } from './role-api.provider';

import { RoleLayoutComponent } from './role-layout/role-layout.component';

import { ListRoleViewComponent } from './list-role-view/list-role-view.component';
import { DetailsRoleViewComponent } from './details-role-view/details-role-view.component';
import { DetailsRoleComponent } from './details-role/details-role.component';
import { CreateRoleFormComponent } from './create-role-form/create-role-form.component';
import { CreateRoleViewComponent } from './create-role-view/create-role-view.component';

@NgModule({
  declarations: [
    RoleLayoutComponent,
    ListRoleViewComponent,
    DetailsRoleViewComponent,
    DetailsRoleComponent,
    CreateRoleFormComponent,
    CreateRoleViewComponent
  ],
  exports: [
    RoleRoutingModule,

    DetailsRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,

    CoreModule,
    GroupModule,

    RoleRoutingModule
  ],
  providers: [
    RoleApiProvider
  ]
})
export class RoleModule {}
