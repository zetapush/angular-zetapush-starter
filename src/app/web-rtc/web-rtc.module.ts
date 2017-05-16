import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { UserModule } from '../user';
// TODO Refactor with Lerna
import { GroupModule } from '../group';
// TODO Refactor with Lerna
import { ConversationModule } from '../conversation';
// TODO Refactor with Lerna
import { OrganizationModule } from '../organization';

import { WebRTCRoutingModule } from './web-rtc-routing.module';

import { WebRTCApiProvider } from './webRTC-api.service';

import { WebRTCViewComponent } from './webRTC-view/webRTC-view.component';
import { CreateWebRTCViewActionComponent } from './create-webRTC-view-action/create-webRTC-view-action.component';
import { WebRtcService } from './webRTC-service/webRTC.service';
import { OrderByTimestampPipe } from './pipes/orderByTimestamp.pipe';

@NgModule({
  declarations: [
    WebRTCViewComponent,
    CreateWebRTCViewActionComponent,
    OrderByTimestampPipe
  ],
  exports: [
    WebRTCRoutingModule,
  ],
  entryComponents: [
    CreateWebRTCViewActionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    UiModule,
    GroupModule,
    UserModule,
    ConversationModule,
    OrganizationModule,
    WebRTCRoutingModule
  ],
  providers: [
    WebRTCApiProvider,
    WebRtcService
  ]
})
export class WebRTCModule { }
