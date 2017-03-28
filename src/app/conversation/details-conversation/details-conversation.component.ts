import { Component, Input, OnInit } from '@angular/core';

import { Conversation } from '../';

@Component({
  selector: 'zp-details-conversation',
  templateUrl: './details-conversation.component.html',
  styles: [`

  `]
})
export class DetailsConversationComponent implements OnInit {

  @Input() conversation: Conversation;

  constructor() { }

  ngOnInit() {
  }

}
