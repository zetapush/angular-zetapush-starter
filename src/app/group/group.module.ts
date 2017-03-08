import { NgModule } from '@angular/core';

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
  imports: [
    CoreModule,
    GroupRoutingModule
  ],
  providers: [
    GroupApiProvider
  ]
})
export class GroupModule { }
