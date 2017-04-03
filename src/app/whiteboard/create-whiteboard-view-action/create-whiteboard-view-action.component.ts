import { Component } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

// TODO Refactor with Lerna
import { ViewActionComponent } from '../../core';
// TODO Refactor with Lerna
import { Conversation } from '../../conversation';

import { WhiteboardApi } from '../';

@Component({
  selector: 'zp-create-whiteboard-view-action',
  template: `
    <button md-button (click)="onCreateWhiteboard($event)" [disabled]="!conversation"><md-icon>format_shapes</md-icon></button>
  `,
  styles: []
})
export class CreateWhiteboardViewActionComponent implements ViewActionComponent {

  context: ReplaySubject<any>;
  parameters: any;
  conversation: Conversation;

  constructor(private api: WhiteboardApi) {
    console.log('CreateWhiteboardViewActionComponent::constructor', api);
  }

  onContextInjected(context: ReplaySubject<any>) {
    console.log('CreateWhiteboardViewActionComponent::onContextInjected', context);
    this.context = context;
    this.context.subscribe((conversation) => {
      console.log('CreateWhiteboardViewActionComponent::onGetContext', conversation);
      this.conversation = conversation;
    });
  }

  onCreateWhiteboard($event) {
    console.log('CreateWhiteboardViewActionComponent::onCreateWhiteboard', $event, this.conversation);
    this.api.createWhiteboard({
      room: this.conversation.room
    }).then((message) => {
      console.log('DetailsConversationComponent::onCreateWhiteboard', message);
    }, (errors) => {
      console.error('DetailsConversationComponent::onCreateWhiteboard', errors);
    });
  }

}
