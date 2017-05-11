import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// TODO Refactor with Lerna
import { ViewActionComponent } from '../../core';
// TODO Refactor with Lerna
import { Conversation } from '../../conversation';

import { WebRTCApi } from '../';

@Component({
  selector: 'zp-create-webRTC-view-action',
  template: `
    <button md-button (click)="onCreateWebRTC($event)" [disabled]="!conversation"><md-icon>format_shapes</md-icon></button>
  `,
  styles: []
})
export class CreateWebRTCViewActionComponent implements ViewActionComponent {

  context: ReplaySubject<any>;
  parameters: any;
  conversation: Conversation;

  constructor(private api: WebRTCApi) {
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
  }

}
