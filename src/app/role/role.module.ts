import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { GroupModule } from '../group';

import { RoleRoutingModule } from './role-routing.module';

import { RoleApiProvider } from './role-api.provider';

import { RoleLayoutComponent } from './role-layout/role-layout.component';

import { ListRoleViewComponent } from './list-role-view/list-role-view.component';
import { ListUserRoleViewComponent } from './list-user-role-view/list-user-role-view.component';
import { DetailsRoleViewComponent } from './details-role-view/details-role-view.component';
import { DetailsRoleComponent } from './details-role/details-role.component';
import { CreatePermissionFormComponent } from './create-permission-form/create-permission-form.component';
import { CreateRoleFormComponent } from './create-role-form/create-role-form.component';
import { CreateRoleViewComponent } from './create-role-view/create-role-view.component';
import { HasPermissionDirective } from './has-permission.directive';
import { HasRoleDirective } from './has-role.directive';

@NgModule({
  declarations: [
    RoleLayoutComponent,
    ListRoleViewComponent,
    ListUserRoleViewComponent,
    DetailsRoleViewComponent,
    DetailsRoleComponent,
    CreatePermissionFormComponent,
    CreateRoleFormComponent,
    CreateRoleViewComponent,
    HasPermissionDirective,
    HasRoleDirective
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
    UiModule,
    GroupModule,

    RoleRoutingModule
  ],
  providers: [
    RoleApiProvider
  ]
})
export class RoleModule {}
