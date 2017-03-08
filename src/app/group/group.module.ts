import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';

import { GroupRoutingModule } from './group-routing.module';

import { GroupApiProvider } from './group-api.provider';

import { GroupLayoutComponent } from './group-layout/group-layout.component';

import { ListGroupViewComponent } from './list-group-view/list-group-view.component';
import { DetailsGroupViewComponent } from './details-group-view/details-group-view.component';
import { DetailsGroupComponent } from './details-group/details-group.component';

@NgModule({
  declarations: [
    GroupLayoutComponent,
    ListGroupViewComponent,
    DetailsGroupViewComponent,
    DetailsGroupComponent
  ],
  exports: [
    GroupRoutingModule,

    DetailsGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    CoreModule,
    GroupRoutingModule
  ],
  providers: [
    GroupApiProvider
  ]
})
export class GroupModule { }
