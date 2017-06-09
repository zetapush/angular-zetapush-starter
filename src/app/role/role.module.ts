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
import { OrganizationModule } from '../organization';
// TODO Refactor with Lerna
import { UserModule } from '../user';

import { RoleRoutingModule } from './role-routing.module';

import { PermissionApiProvider } from './permission-api.service';
import { RoleApiProvider } from './role-api.service';

import { ListRoleViewComponent } from './list-role-view/list-role-view.component';
import { ListUserRoleViewComponent } from './list-user-role-view/list-user-role-view.component';
import { DetailsRoleViewComponent } from './details-role-view/details-role-view.component';
import { DetailsRoleComponent } from './details-role/details-role.component';
import { CreatePermissionFormComponent } from './create-permission-form/create-permission-form.component';
import { CreateRoleFormComponent } from './create-role-form/create-role-form.component';
import { CreateRoleViewComponent } from './create-role-view/create-role-view.component';
import { HasPermissionDirective } from './has-permission.directive';
import { HasRoleDirective } from './has-role.directive';
import { PermissionGridViewComponent } from './permission-grid-view/permission-grid-view.component';

@NgModule({
  declarations: [
    ListRoleViewComponent,
    ListUserRoleViewComponent,
    DetailsRoleViewComponent,
    DetailsRoleComponent,
    CreatePermissionFormComponent,
    CreateRoleFormComponent,
    CreateRoleViewComponent,
    HasPermissionDirective,
    HasRoleDirective,
    PermissionGridViewComponent,
  ],
  exports: [RoleRoutingModule, DetailsRoleComponent],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    UiModule,
    GroupModule,
    OrganizationModule,
    UserModule,

    RoleRoutingModule,
  ],
  providers: [PermissionApiProvider, RoleApiProvider],
})
export class RoleModule {}
