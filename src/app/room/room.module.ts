import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { RouterModule } from '../router';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { FileModule } from '../file';
// TODO Refactor with Lerna
import { GroupModule } from '../group';
// TODO Refactor with Lerna
import { UserModule } from '../user';
// TODO Refactor with Lerna
import { OrganizationModule } from '../organization';

import { RoomRoutingModule } from './room-routing.module';

import { RoomApiProvider } from './room-api.service';

import { ListRoomViewComponent } from './list-room-view/list-room-view.component';
import { ListUserRoomViewComponent } from './list-user-room-view/list-user-room-view.component';
import { DetailsRoomViewComponent } from './details-room-view/details-room-view.component';
import { DetailsRoomComponent } from './details-room/details-room.component';
import { RoomLinkComponent } from './room-link/room-link.component';
import {
  RoomDefaultMessageComponent,
  RoomAttachmentMessageComponent,
  RoomEventMessageComponent,
  RoomMarkupMessageComponent,
} from './room-message/room-message.component';

@NgModule({
  declarations: [
    ListRoomViewComponent,
    ListUserRoomViewComponent,
    DetailsRoomViewComponent,
    DetailsRoomComponent,
    RoomLinkComponent,
    RoomDefaultMessageComponent,
    RoomAttachmentMessageComponent,
    RoomEventMessageComponent,
    RoomMarkupMessageComponent,
  ],
  exports: [
    RoomRoutingModule,

    DetailsRoomComponent,
    RoomLinkComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    RouterModule,
    UiModule,
    FileModule,
    GroupModule,
    UserModule,
    OrganizationModule,

    RoomRoutingModule,
  ],
  providers: [RoomApiProvider],
})
export class RoomModule {}
