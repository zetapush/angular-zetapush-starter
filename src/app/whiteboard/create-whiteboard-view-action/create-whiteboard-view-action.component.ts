import { Component } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

// TODO Refactor with Lerna
import { ViewActionComponent } from '../../core';
// TODO Refactor with Lerna
import { Room } from '../../room';

import { WhiteboardApi } from '../';

@Component({
  selector: 'zp-create-whiteboard-view-action',
  template: `
    <button mat-button (click)="onCreateWhiteboard($event)" [disabled]="!room"><mat-icon>format_shapes</mat-icon></button>
  `,
  styles: [],
})
export class CreateWhiteboardViewActionComponent
  implements ViewActionComponent {
  context: ReplaySubject<any>;
  parameters: any;
  room: Room;

  constructor(private api: WhiteboardApi) {
    console.log('CreateWhiteboardViewActionComponent::constructor', api);
  }

  onContextInjected(context: ReplaySubject<any>) {
    console.log(
      'CreateWhiteboardViewActionComponent::onContextInjected',
      context,
    );
    this.context = context;
    this.context.subscribe(room => {
      console.log('CreateWhiteboardViewActionComponent::onGetContext', room);
      this.room = room;
    });
  }

  onCreateWhiteboard($event) {
    console.log(
      'CreateWhiteboardViewActionComponent::onCreateWhiteboard',
      $event,
      this.room,
    );
    this.api
      .createWhiteboard({
        room: this.room.room,
      })
      .then(
        message => {
          console.log('DetailsRoomComponent::onCreateWhiteboard', message);
        },
        errors => {
          console.error('DetailsRoomComponent::onCreateWhiteboard', errors);
        },
      );
  }
}
