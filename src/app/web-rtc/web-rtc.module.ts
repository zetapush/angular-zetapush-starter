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

import { WebRTCRoutingModule } from './web-rtc-routing.module';

import { WebRTCApiProvider } from './webRTC-api.service';

import { ListWebRTCViewComponent } from './list-webRTC-view/list-webRTC-view.component';
import { DetailsWebRTCViewComponent } from './details-webRTC-view/details-webRTC-view.component';
import { DetailsWebRTCComponent } from './details-webRTC/details-webRTC.component';
import { CreateWebRTCViewActionComponent } from './create-webRTC-view-action/create-webRTC-view-action.component';

@NgModule({
  declarations: [
    ListWebRTCViewComponent,
    DetailsWebRTCViewComponent,
    DetailsWebRTCComponent,
    CreateWebRTCViewActionComponent
  ],
  exports: [
    WebRTCRoutingModule,
    DetailsWebRTCComponent
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

    WebRTCRoutingModule
  ],
  providers: [
    WebRTCApiProvider
  ]
})
export class WebRTCModule { }
