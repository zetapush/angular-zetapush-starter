import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Router } from '@angular/router';
import { WebRtcService } from '../webRTC-service/webRTC.service';
import { UserApi } from '../../user';

// TODO Refactor with Lerna
import { ViewActionComponent } from '../../core';
// TODO Refactor with Lerna
import { Conversation } from '../../conversation';

import { WebRTCApi } from '../';

@Component({
  selector: 'zp-create-webRTC-view-action',
  template: `
    <button md-button (click)="onCreateWebRTC($event)" [disabled]="!conversation"><md-icon>videocam</md-icon></button>
  `,
  styles: []
})
export class CreateWebRTCViewActionComponent implements ViewActionComponent {

  context: ReplaySubject<any>;
  parameters: any;
  conversation: Conversation;

  constructor(private api: WebRTCApi, private router: Router, private webrtc: WebRtcService, private userApi: UserApi) {
    console.log('CreateWebRTCViewActionComponent::constructor', api);
  }

  onContextInjected(context: ReplaySubject<any>) {
    console.log('CreateWebRTCViewActionComponent::onContextInjected', context);
    this.context = context;
    this.context.subscribe((conversation) => {
      console.log('CreateWebRTCViewActionComponent::onGetContext', conversation);
      this.conversation = conversation;
    });
  }

  onCreateWebRTC($event) {
    console.log('CreateWebRTCViewActionComponent::onCreateWebRTC', $event, this.conversation);
    this.router.navigate(['webrtc/', this.conversation.room.owner, this.conversation.room.id]);

    this.userApi.getUser({}).then( (user) => {
      for (let name of this.conversation.room.members) {
        if (name.login != user.login) {
          this.webrtc.askForVideoCall(name.userKey, "ask", this.conversation.room.owner, this.conversation.room.id);
        }
      }
    });

  }

}
