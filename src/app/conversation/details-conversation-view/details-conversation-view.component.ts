import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Conversation, ConversationApi } from '../';

// TODO Refactor with Lerna
import { WhiteboardApi } from '../../whiteboard/';

@Component({
  selector: 'zp-details-conversation-view',
  templateUrl: './details-conversation-view.component.html',
  styles: [`

  `]
})
export class DetailsConversationViewComponent implements OnDestroy, OnInit {

  conversation: Conversation;

  subscriptions: Array<Subscription> = [];

  constructor(private cApi: ConversationApi, private route: ActivatedRoute, /** TODO Externalize API */private wApi: WhiteboardApi) {
    console.log('DetailsConversationViewComponent::constructor', cApi, wApi);
    route.params.subscribe((params) => {
      cApi.getConversation({ id: params.id, owner: params.owner }).then((conversation: Conversation) => {
        console.log('DetailsConversationViewComponent::onGetConversation', conversation);
        this.conversation = conversation;
      }, (errors) => {
        console.error('DetailsConversationViewComponent::onGetConversation', errors);
      });
    });

    this.subscriptions.push(cApi.onAddConversationMessage.subscribe(({ message }) => {
      console.log('DetailsConversationViewComponent::onAddConversationMessage', message);
      this.conversation.messages.push(message);
    }));
    this.subscriptions.push(cApi.onPurgeConversationMessageList.subscribe(() => {
      console.log('DetailsConversationViewComponent::onPurgeConversationMessageList');
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
    console.log('DetailsConversationViewComponent::onSubmit', value, valid, event);

    if (valid) {
      const parameters = {
        room: this.conversation.room,
        type: 'markup',
        value: {
          text: value
        },
        metadata: {

        }
      };
      this.cApi.addConversationMessage(parameters).then(({ message }) => {
        console.log('DetailsConversationViewComponent::onAddConversationMessage', message);
      }, (errors) => {
        console.error('DetailsConversationViewComponent::onAddConversationMessage', errors);
      });
      event.target.reset();
    }
  }

  onCreateWhiteboard($event) {
    console.log('DetailsConversationViewComponent::onCreateWhiteboard', $event);

    this.wApi.createWhiteboard({
      room: this.conversation.room
    }).then((message) => {
      console.log('DetailsConversationViewComponent::onCreateWhiteboard', message);
    }, (errors) => {
      console.error('DetailsConversationViewComponent::onCreateWhiteboard', errors);
    });
  }

  onPurgConversation($event) {
    this.cApi.purgeConversationMessageList({
      room: this.conversation.room
    }).then((message) => {
      console.log('DetailsConversationViewComponent::onPurgeConversationMessageList', message);
    }, (errors) => {
      console.error('DetailsConversationViewComponent::onPurgeConversationMessageList', errors);
    });
  }

}
