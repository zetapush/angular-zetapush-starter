import { Component, Input } from '@angular/core';

// TODO Refactor with Lerna
import { ZetaPushClient } from '../../zetapush';

import { Conversation } from '../conversation-api.service';

@Component({
  selector: 'zp-conversation-link',
  template: `
    <a routerLink="/conversation/details/{{conversation.room.owner}}/{{conversation.room.id}}">{{getConversationName()}}</a>
  `,
  styles: [`

  `]
})
export class ConversationLinkComponent {

  @Input() conversation: Conversation;

  constructor(private client: ZetaPushClient) { }

  getConversationName() {
    const { room } = this.conversation;
    let name = room.name;
    if (name === 'I18N.ONE_TO_ONE_CONVERSATION' && room.members.length === 2) {
      const userKey = this.client.getUserId();
      const interlocutor = room.members.find((member) => member.userKey !== userKey);
      name = `@${interlocutor.login} (${interlocutor.firstname} ${interlocutor.lastname})`;
    }
    return name;
  }
}
