import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

// TODO Refactor with Lerna
import { Conversation, ConversationApi } from '../../conversation';

import { Color, Mode, WhiteboardApi } from '../';

@Component({
  selector: 'zp-details-whiteboard-view',
  templateUrl: './details-whiteboard-view.component.html',
  styles: [`
    md-radio-button {
      font-weight: bold;
    }
    zp-fabric {
      border: 1px solid #000;
      height: 500px;
      display: block;
    }
  `]
})
export class DetailsWhiteboardViewComponent implements OnInit {

  mode: Mode = 'Draw';
  modes: Array<Mode> = ['Draw', 'Edit', 'Text', 'Arrow'];

  color: Color = 'rgb(229,80,49)';
  colors: Array<Color> = ['rgb(229,80,49)', 'rgb(253,203,55)', 'rgb(152,192,72)', 'rgb(0,169,228)'];

  images: Array<any> = [];

  config: any;

  conversation: Conversation;

  whiteboard: string;

  private subscriptions: Array<Subscription> = [];

  constructor(private route: ActivatedRoute, private cApi: ConversationApi, private wApi: WhiteboardApi) {
    console.log('DetailsConversationViewComponent::constructor', wApi);
    route.params.subscribe((params) => {
      this.whiteboard = params.whiteboard;
      cApi.getConversation({ id: params.room, owner: params.owner }).then((conversation: Conversation) => {
        console.log('DetailsConversationViewComponent::onGetConversation', conversation);
        this.conversation = conversation;
        this.loadWhiteboard();
      }, (errors) => {
        console.error('DetailsConversationViewComponent::onGetConversation', errors);
      });
    });
    this.subscriptions.push(wApi.onAddWhiteboardObject.subscribe((message) => {
      console.log('DetailsConversationViewComponent::onAddWhiteboardObject', message);
      // DUMMY Impl
      this.loadWhiteboard();
    }));
    this.subscriptions.push(wApi.onUpdateWhiteboardObject.subscribe((message) => {
      console.log('DetailsConversationViewComponent::onUpdateWhiteboardObject', message);
      // DUMMY Impl
      this.loadWhiteboard();
    }));
    this.subscriptions.push(wApi.onPurgeWhiteboardObjectList.subscribe((message) => {
      console.log('DetailsConversationViewComponent::onPurgeWhiteboardObjectList', message);
      // DUMMY Impl
      this.config.objects = [];
    }));
  }

  ngOnInit() {
  }

  private loadWhiteboard() {
    console.log('DetailsConversationViewComponent::loadWhiteboard');
    this.wApi.getWhiteboardObjectList({
      room: this.conversation.room,
      whiteboard: this.whiteboard
    }).then(({ room, list, page }) => {
      console.log('DetailsConversationViewComponent::onGetWhiteboardObjectList', room, list, page);
      const config = {
        objects: list.map((message) => Object.assign(JSON.parse(message.value.json), {
          'server:id': message.id
        }))
      };
      console.log('DetailsConversationViewComponent::onGetWhiteboardObjectList', config);
      this.config = config;
    }, (errors) => {
      console.error('DetailsConversationViewComponent::onGetWhiteboardObjectList', errors);
    });
  }

  onObjectAdded($event) {
    console.log('DetailsWhiteboardViewComponent::onObjectAdded', $event);
    if (!$event['server:id']) {
      this.wApi.addWhiteboardObject({
        room: this.conversation.room,
        type: 'widget',
        value: {
          json: JSON.stringify($event)
        },
        metadata: {
          yo: 'bitch'
        },
        whiteboard: this.whiteboard
      }).then((message) => {
        console.log('DetailsWhiteboardViewComponent::onAddWhiteboardObject', message);
      }, (errors) => {
        console.error('DetailsWhiteboardViewComponent::onAddWhiteboardObject', errors);
      });
    }
  }

  onObjectModified($event) {
    console.log('DetailsWhiteboardViewComponent::onObjectModified', $event);
    if ($event['server:id']) {
      this.wApi.updateWhiteboardObject({
        id: $event['server:id'],
        room: this.conversation.room,
        value: {
          json: JSON.stringify($event)
        },
        whiteboard: this.whiteboard
      }).then((message) => {
        console.log('DetailsWhiteboardViewComponent::onUpdateWhiteboardObject', message);
      }, (errors) => {
        console.error('DetailsWhiteboardViewComponent::onUpdateWhiteboardObject', errors);
      });
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
      room: this.conversation.room,
      whiteboard: this.whiteboard
    });
  }

  onSelectFiles(images) {
    console.log('DetailsWhiteboardViewComponent::onSelectFiles', images);

    this.images = images
  }
}
