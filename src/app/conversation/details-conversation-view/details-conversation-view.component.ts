import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Conversation, ConversationApi } from '../';

@Component({
  selector: 'zp-details-conversation-view',
  templateUrl: './details-conversation-view.component.html',
  styles: [`

  `]
})
export class DetailsConversationViewComponent {

  conversation: Conversation;

  constructor(private cApi: ConversationApi, private route: ActivatedRoute) {
    console.log('DetailsConversationViewComponent::constructor', cApi);
    route.params.subscribe((params) => {
      cApi.getConversation({ id: params.id, owner: params.owner }).then((conversation: Conversation) => {
        console.log('DetailsConversationViewComponent::onGetConversation', conversation);
        this.conversation = conversation;
      }, (errors) => {
        console.error('DetailsConversationViewComponent::onGetConversation', errors);
      });
    });
  }

}
