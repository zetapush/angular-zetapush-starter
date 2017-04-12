import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Conversation, ConversationApi } from '../';

@Component({
  selector: 'zp-details-conversation-view',
  template: `
    <h1>details-conversation-view</h1>
    <zp-details-conversation [conversation]="conversation"></zp-details-conversation>
  `,
  styles: [`
    h1 {color:pink;}
  `]
})
export class DetailsConversationViewComponent {

  conversation: Conversation;

  constructor(private api: ConversationApi, private route: ActivatedRoute) {
    console.log('DetailsConversationViewComponent::constructor', api);
    route.params.subscribe((params) => {
      api.getConversation({ id: params.id, owner: params.owner }).then((conversation: Conversation) => {
        console.log('DetailsConversationViewComponent::onGetConversation', conversation);
        this.conversation = conversation;
      }, (errors) => {
        console.error('DetailsConversationViewComponent::onGetConversation', errors);
      });
    });
  }

}
