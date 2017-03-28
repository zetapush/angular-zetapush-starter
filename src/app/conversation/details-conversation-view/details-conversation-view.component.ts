import { Component } from '@angular/core';
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
export class DetailsConversationViewComponent {

  conversation: Conversation;

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
  }

}
