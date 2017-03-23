import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Conversation, ConversationApi } from '../';

@Component({
  selector: 'zp-details-conversation-view',
  templateUrl: './details-conversation-view.component.html',
  styles: [`

  `]
})
export class DetailsConversationViewComponent implements OnInit {

  conversation: Conversation;

  constructor(private api: ConversationApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      api.getConversation({ id: params.id, owner: params.owner }).then((conversation: Conversation) => {
        console.log('DetailsConversationViewComponent::onGetConversation', conversation);
        this.conversation = conversation;
      }, (errors) => {
        console.error('DetailsConversationViewComponent::onGetConversation', errors);
      });
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
      this.api.addConversationMessage(parameters).then(({ message }) => {
        console.log('DetailsConversationViewComponent::onAddConversationMessage', message);
        this.conversation.messages.push(message);
      }, (errors) => {
        console.error('DetailsConversationViewComponent::onAddConversationMessage', errors);
      });
      event.target.reset();
    }
  }

}
