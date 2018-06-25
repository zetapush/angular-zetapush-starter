import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

// TODO Refactor with Lerna
import { Room, RoomApi } from '../../room';

import { Color, Mode, WhiteboardApi } from '../';

@Component({
  selector: 'zp-details-whiteboard-view',
  templateUrl: './details-whiteboard-view.component.html',
  styles: [
    `
    mat-radio-button {
      font-weight: bold;
    }
    [zpFabric] {
      border: 1px solid #000;
      height: 500px;
      display: block;
    }
  `,
  ],
})
export class DetailsWhiteboardViewComponent implements OnInit {
  mode: Mode = 'Draw';
  modes: Array<Mode> = ['Draw', 'Edit', 'Text', 'Arrow'];

  color: Color = 'rgb(229,80,49)';
  colors: Array<Color> = [
    'rgb(229,80,49)',
    'rgb(253,203,55)',
    'rgb(152,192,72)',
    'rgb(0,169,228)',
  ];

  images: Array<any> = [];

  config: any;

  room: Room;

  whiteboard: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private route: ActivatedRoute,
    private cApi: RoomApi,
    private wApi: WhiteboardApi,
  ) {
    console.log('DetailsRoomViewComponent::constructor', wApi);
    route.params.subscribe(params => {
      this.whiteboard = params.whiteboard;
      cApi.getRoom({ id: params.room, owner: params.owner }).then(
        (room: Room) => {
          console.log('DetailsRoomViewComponent::onGetRoom', room);
          this.room = room;
          this.loadWhiteboard();
        },
        errors => {
          console.error('DetailsRoomViewComponent::onGetRoom', errors);
        },
      );
    });
    this.subscriptions.push(
      wApi.onAddWhiteboardObject.subscribe(message => {
        console.log('DetailsRoomViewComponent::onAddWhiteboardObject', message);
        // DUMMY Impl
        this.loadWhiteboard();
      }),
    );
    this.subscriptions.push(
      wApi.onUpdateWhiteboardObject.subscribe(message => {
        console.log(
          'DetailsRoomViewComponent::onUpdateWhiteboardObject',
          message,
        );
        // DUMMY Impl
        this.loadWhiteboard();
      }),
    );
    this.subscriptions.push(
      wApi.onPurgeWhiteboardObjectList.subscribe(message => {
        console.log(
          'DetailsRoomViewComponent::onPurgeWhiteboardObjectList',
          message,
        );
        // DUMMY Impl
        this.config.objects = [];
      }),
    );
  }

  ngOnInit() {}

  private loadWhiteboard() {
    console.log('DetailsRoomViewComponent::loadWhiteboard');
    this.wApi
      .getWhiteboardObjectList({
        room: this.room.room,
        whiteboard: this.whiteboard,
      })
      .then(
        ({ room, list, page }) => {
          console.log(
            'DetailsRoomViewComponent::onGetWhiteboardObjectList',
            room,
            list,
            page,
          );
          const config = {
            objects: list.map(message =>
              Object.assign(JSON.parse(message.value.json), {
                'server:id': message.id,
              }),
            ),
          };
          console.log(
            'DetailsRoomViewComponent::onGetWhiteboardObjectList',
            config,
          );
          this.config = config;
        },
        errors => {
          console.error(
            'DetailsRoomViewComponent::onGetWhiteboardObjectList',
            errors,
          );
        },
      );
  }

  onObjectAdded($event) {
    console.log('DetailsWhiteboardViewComponent::onObjectAdded', $event);
    if (!$event['server:id']) {
      this.wApi
        .addWhiteboardObject({
          room: this.room.room,
          type: 'widget',
          value: {
            json: JSON.stringify($event),
          },
          metadata: {},
          whiteboard: this.whiteboard,
        })
        .then(
          message => {
            console.log(
              'DetailsWhiteboardViewComponent::onAddWhiteboardObject',
              message,
            );
          },
          errors => {
            console.error(
              'DetailsWhiteboardViewComponent::onAddWhiteboardObject',
              errors,
            );
          },
        );
    }
  }

  onObjectModified($event) {
    console.log('DetailsWhiteboardViewComponent::onObjectModified', $event);
    if ($event['server:id']) {
      this.wApi
        .updateWhiteboardObject({
          id: $event['server:id'],
          room: this.room.room,
          value: {
            json: JSON.stringify($event),
          },
          whiteboard: this.whiteboard,
        })
        .then(
          message => {
            console.log(
              'DetailsWhiteboardViewComponent::onUpdateWhiteboardObject',
              message,
            );
          },
          errors => {
            console.error(
              'DetailsWhiteboardViewComponent::onUpdateWhiteboardObject',
              errors,
            );
          },
        );
    }
  }

  onObjectSelected($event) {
    console.log('DetailsWhiteboardViewComponent::onObjectSelected', $event);
  }

  onObjectRemoved($event) {
    console.log('DetailsWhiteboardViewComponent::onObjectRemoved', $event);
  }

  onPurgeWhiteboard($event) {
    console.log('DetailsWhiteboardViewComponent::onPurgeWhiteboard', $event);
    this.wApi.purgeWhiteboardObjectList({
      room: this.room.room,
      whiteboard: this.whiteboard,
    });
  }

  onSelectFiles(images) {
    console.log('DetailsWhiteboardViewComponent::onSelectFiles', images);

    this.images = images;
  }
}
