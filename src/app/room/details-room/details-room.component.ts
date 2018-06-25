import { Component, Input, OnDestroy, OnChanges } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { Room, RoomApi } from '../';

// TODO Refactor with Lerna
import { View } from '../../core/';
// TODO Refactor with Lerna
import { FileUploadRequest } from '../../file';

@Component({
  selector: 'zp-details-room',
  templateUrl: './details-room.component.html',
  styles: [
    `

  `,
  ],
})
export class DetailsRoomComponent implements OnDestroy, OnChanges {
  @Input() room: Room;

  readonly view: View = DetailsRoomComponent;

  context = new ReplaySubject<any>();

  private subscriptions: Array<Subscription> = [];

  constructor(private api: RoomApi) {
    console.log('DetailsRoomComponent::constructor', api);

    this.subscriptions.push(
      api.onAddRoomMessage.subscribe(({ message }) => {
        console.log(
          'DetailsRoomComponent::onAddRoomMessage',
          message,
        );
        this.room.messages.push(message);
      }),
    );
    this.subscriptions.push(
      api.onPurgeRoomMessageList.subscribe(() => {
        console.log(
          'DetailsRoomComponent::onPurgeRoomMessageList',
        );
        this.room.messages.length = 0;
      }),
    );
  }

  ngOnDestroy() {
    // Remove subscription
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnChanges(changes) {
    const { room } = changes;
    if (room && room.currentValue) {
      this.context.next(room.currentValue);
    }
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }, event) {
    console.log('DetailsRoomComponent::onSubmit', value, valid, event);

    if (valid) {
      const parameters = {
        room: this.room.room,
        type: 'markup',
        value: {
          text: value.message,
        },
        metadata: {},
      };
      this.api.addRoomMessage(parameters).then(
        ({ message }) => {
          console.log(
            'DetailsRoomComponent::onAddRoomMessage',
            message,
          );
        },
        errors => {
          console.error(
            'DetailsRoomComponent::onAddRoomMessage',
            errors,
          );
        },
      );
      event.target.reset();
    }
  }

  onPurgRoom($event) {
    this.api
      .purgeRoomMessageList({
        room: this.room.room,
      })
      .then(
        message => {
          console.log(
            'DetailsRoomComponent::onPurgeRoomMessageList',
            message,
          );
        },
        errors => {
          console.error(
            'DetailsRoomComponent::onPurgeRoomMessageList',
            errors,
          );
        },
      );
  }

  onRequestConfirmed(request: FileUploadRequest) {
    console.log('DetailsRoomComponent::onRequestConfirmed', request);

    /*
    const parameters = {
      room: this.room.room,
      type: 'attachment',
      value: {
        contentType: request.contentType,
        guid: request.transfer.guid,
        path: `${request.folder}/${request.transfer.guid}`
      },
      metadata: {

      }
    };
    this.api.addRoomMessage(parameters).then(({ message }) => {
      console.log('DetailsRoomComponent::onAddRoomMessage', message);
    }, (errors) => {
      console.error('DetailsRoomComponent::onAddRoomMessage', errors);
    });
    */
  }
}
