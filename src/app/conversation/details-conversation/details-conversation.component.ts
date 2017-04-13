import { Component, Input, OnDestroy, OnChanges } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { Conversation, ConversationApi } from '../';

// TODO Refactor with Lerna
import { View } from '../../core/';
// TODO Refactor with Lerna
import { FileUploadRequest } from '../../file';

@Component({
  selector: 'zp-details-conversation',
  templateUrl: './details-conversation.component.html',
  styles: [`

  `]
})
export class DetailsConversationComponent implements OnDestroy, OnChanges {

  @Input() conversation: Conversation;

  readonly view: View = DetailsConversationComponent;

  context = new ReplaySubject<any>();

  private subscriptions: Array<Subscription> = [];

  constructor(private api: ConversationApi) {
    console.log('DetailsConversationComponent::constructor', api);

    this.subscriptions.push(api.onAddConversationMessage.subscribe(({ message }) => {
      console.log('DetailsConversationComponent::onAddConversationMessage', message);
      this.conversation.messages.push(message);
    }));
    this.subscriptions.push(api.onPurgeConversationMessageList.subscribe(() => {
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

  ngOnChanges(changes) {
    const { conversation } = changes;
    if (conversation && conversation.currentValue) {
      this.context.next(conversation.currentValue);
    }
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
      this.api.addConversationMessage(parameters).then(({ message }) => {
        console.log('DetailsConversationComponent::onAddConversationMessage', message);
      }, (errors) => {
        console.error('DetailsConversationComponent::onAddConversationMessage', errors);
      });
      event.target.reset();
    }
  }

  onPurgConversation($event) {
    this.api.purgeConversationMessageList({
      room: this.conversation.room
    }).then((message) => {
      console.log('DetailsConversationComponent::onPurgeConversationMessageList', message);
    }, (errors) => {
      console.error('DetailsConversationComponent::onPurgeConversationMessageList', errors);
    });
  }

  onRequestConfirmed(request: FileUploadRequest) {
    console.log('DetailsConversationComponent::onRequestConfirmed', request);

    /*
    const parameters = {
      room: this.conversation.room,
      type: 'attachment',
      value: {
        contentType: request.contentType,
        guid: request.transfer.guid,
        path: `${request.folder}/${request.transfer.guid}`
      },
      metadata: {

      }
    };
    this.api.addConversationMessage(parameters).then(({ message }) => {
      console.log('DetailsConversationComponent::onAddConversationMessage', message);
    }, (errors) => {
      console.error('DetailsConversationComponent::onAddConversationMessage', errors);
    });
    */
  }

}
