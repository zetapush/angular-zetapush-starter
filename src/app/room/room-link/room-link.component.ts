import { Component, Input } from '@angular/core';
import { ZetaPushClient } from 'zetapush-angular';

import { Room } from '../';

@Component({
  selector: 'zp-room-link',
  template: `
    <a routerLink="/room/details/{{room.room.owner}}/{{room.room.id}}">{{getRoomName()}}</a>
  `,
  styles: [
    `

  `,
  ],
})
export class RoomLinkComponent {
  @Input() room: Room;

  constructor(private client: ZetaPushClient) {}

  getRoomName() {
    const { room } = this.room;
    let name = room.name;
    if (name === 'I18N.ONE_TO_ONE_ROOM' && room.members.length === 2) {
      const userKey = this.client.getUserId();
      const interlocutor = room.members.find(
        member => member.userKey !== userKey,
      );
      name = `@${interlocutor.login} (${interlocutor.firstname} ${interlocutor.lastname})`;
    }
    return name;
  }
}
