import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoleApiProvider } from './role-api.service';

import { RoleRoutingModule } from './role-routing.module';
import { ListRoleViewComponent } from './list-role-view/list-role-view.component';
import { RoleLayoutComponent } from './role-layout/role-layout.component';

@NgModule({
  declarations: [
    RoleLayoutComponent,
    ListRoleViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    RoleRoutingModule
  ],
  exports: [
    RoleRoutingModule
  ],
  providers: [
    RoleApiProvider
  ]
})
export class RoleModule { }
