import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Room, RoomApi } from '../';

@Component({
  selector: 'zp-details-room-view',
  template: `
    <h1>details-room-view</h1>
    <zp-details-room [room]="room"></zp-details-room>
  `,
  styles: [
    `

  `,
  ],
})
export class DetailsRoomViewComponent {
  room: Room;

  constructor(private api: RoomApi, private route: ActivatedRoute) {
    console.log('DetailsRoomViewComponent::constructor', api);
    route.params.subscribe(params => {
      api.getRoom({ id: params.id, owner: params.owner }).then(
        (room: Room) => {
          console.log(
            'DetailsRoomViewComponent::onGetRoom',
            room,
          );
          this.room = room;
        },
        errors => {
          console.error(
            'DetailsRoomViewComponent::onGetRoom',
            errors,
          );
        },
      );
    });
  }
}
