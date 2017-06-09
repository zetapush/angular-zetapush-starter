import { Component, Input, OnInit } from '@angular/core';
import { ZetaPushClient } from 'zetapush-angular';

// TODO Refactor with Lerna
import { FileApi } from '../../file';

// import { Message } from '../conversation-api.service';

@Component({
  selector: 'zp-conversation-default-message',
  template: `
    <label>Default:<span>{{ message.value | json }}</span></label>
  `,
})
export class ConversationDefaultMessageComponent {
  @Input() message: any;
}

@Component({
  selector: 'zp-conversation-attachment-message',
  template: `
    <label>Attachment:<span>{{ message.value | json }}</span></label>
    <img *ngIf="entry && entry.metadata['thumb-100']" [attr.src]="entry.metadata['thumb-100'].url" />
  `,
})
export class ConversationAttachmentMessageComponent implements OnInit {
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
            'ConversationAttachmentMessageComponent::onGetFileEntry',
            { entry, exists, owner },
          );
          if (exists) {
            this.entry = entry;
          }
        },
        errors => {
          console.error(
            'ConversationAttachmentMessageComponent::onGetFileEntry',
            errors,
          );
        },
      );
  }
}

@Component({
  selector: 'zp-conversation-event-message',
  template: `
    <label>Event:<span>{{ message.value | json }}</span></label>
  `,
})
export class ConversationEventMessageComponent {
  @Input() message: any;
}

@Component({
  selector: 'zp-conversation-markup-message',
  template: `
    <label>Markup:<span>{{ message.value.text }}</span></label>
  `,
})
export class ConversationMarkupMessageComponent {
  @Input() message: any;
}
