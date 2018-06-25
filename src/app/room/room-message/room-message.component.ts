import { Component, Input, OnInit } from '@angular/core';
import { ZetaPushClient } from 'zetapush-angular';

// TODO Refactor with Lerna
import { FileApi } from '../../file';

// import { Message } from '../room-api.service';

@Component({
  selector: 'zp-room-default-message',
  template: `
    <label>Default:<span>{{ message.value | json }}</span></label>
  `,
})
export class RoomDefaultMessageComponent {
  @Input() message: any;
}

@Component({
  selector: 'zp-room-attachment-message',
  template: `
    <label>Attachment:<span>{{ message.value | json }}</span></label>
    <img *ngIf="entry && entry.metadata['thumb-100']" [attr.src]="entry.metadata['thumb-100'].url" />
  `,
})
export class RoomAttachmentMessageComponent implements OnInit {
  @Input() message: any;
  entry: any;
  constructor(private api: FileApi, private client: ZetaPushClient) {}
  ngOnInit() {
    this.api
      .getFileEntry({
        owner: this.message.value.owner,
        path: this.message.value.path,
      })
      .then(
        ({ entry, exists, owner }) => {
          console.log(
            'RoomAttachmentMessageComponent::onGetFileEntry',
            { entry, exists, owner },
          );
          if (exists) {
            this.entry = entry;
          }
        },
        errors => {
          console.error(
            'RoomAttachmentMessageComponent::onGetFileEntry',
            errors,
          );
        },
      );
  }
}

@Component({
  selector: 'zp-room-event-message',
  template: `
    <label>Event:<span>{{ message.value | json }}</span></label>
  `,
})
export class RoomEventMessageComponent {
  @Input() message: any;
}

@Component({
  selector: 'zp-room-markup-message',
  template: `
    <label>Markup:<span>{{ message.value.text }}</span></label>
  `,
})
export class RoomMarkupMessageComponent {
  @Input() message: any;
}
