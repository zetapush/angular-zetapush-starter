import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Conversation, ConversationApi } from '../';

// TODO Refactor with Lerna
import { WhiteboardApi } from '../../whiteboard/';

@Component({
  selector: 'zp-details-conversation',
  templateUrl: './details-conversation.component.html',
  styles: [`

  `]
})
export class DetailsConversationComponent implements OnDestroy, OnInit {

  @Input() conversation: Conversation;

  private subscriptions: Array<Subscription> = [];

  constructor(private cApi: ConversationApi, /** TODO Externalize API */private wApi: WhiteboardApi) {
    console.log('DetailsConversationComponent::constructor', cApi, wApi);

    this.subscriptions.push(cApi.onAddConversationMessage.subscribe(({ message }) => {
      console.log('DetailsConversationComponent::onAddConversationMessage', message);
      this.conversation.messages.push(message);
    }));
    this.subscriptions.push(cApi.onPurgeConversationMessageList.subscribe(() => {
      console.log('DetailsConversationComponent::onPurgeConversationMessageList');
      this.conversation.messages.length = 0;
    }));
  }

  ngOnDestroy() {
    // Remove subscription
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {

  }

  onSubmit({ value, valid }: { value: any, valid: boolean }, event) {
    console.log('DetailsConversationComponent::onSubmit', value, valid, event);

    if (valid) {
      const parameters = {
        room: this.conversation.room,
        type: 'markup',
        value: {
          text: value.message
        },
        metadata: {

        }
      };
      this.cApi.addConversationMessage(parameters).then(({ message }) => {
        console.log('DetailsConversationComponent::onAddConversationMessage', message);
      }, (errors) => {
        console.error('DetailsConversationComponent::onAddConversationMessage', errors);
      });
      event.target.reset();
    }
  }

  onCreateWhiteboard($event) {
    console.log('DetailsConversationComponent::onCreateWhiteboard', $event);

    this.wApi.createWhiteboard({
      room: this.conversation.room
    }).then((message) => {
      console.log('DetailsConversationComponent::onCreateWhiteboard', message);
    }, (errors) => {
      console.error('DetailsConversationComponent::onCreateWhiteboard', errors);
    });
  }

  onPurgConversation($event) {
    this.cApi.purgeConversationMessageList({
      room: this.conversation.room
    }).then((message) => {
      console.log('DetailsConversationComponent::onPurgeConversationMessageList', message);
    }, (errors) => {
      console.error('DetailsConversationComponent::onPurgeConversationMessageList', errors);
    });
  }


}
