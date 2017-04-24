import { Component, Input, OnDestroy, OnChanges } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import { Conversation, ConversationApi } from '../';

// TODO Refactor with Lerna
import { View } from '../../core/';
// TODO Refactor with Lerna
import { FileUploadRequest } from '../../file';

@Component({
  selector: 'zp-details-conversation',
  templateUrl: './details-conversation.component.html',
  styles: [`
  .mdc-list-item{
    height:auto;
    padding: 0.5rem;
    align-items:flex-end;
  }
  .mat-card{
    padding:14px;
    background:#EDEDED;
    max-width:300px;
    box-shadow:none !important;
    border-radius:8px;
  }

  #infos{
    right:0px;
    position:absolute;
  }

  .mat-fab, .mat-mini-fab{
    background-color:#11213b;
  }

  .mat-sidenav-container{
    color:#11213b;
  }

  .mdc-list-item__start-detail{
    margin-right:8px;
    border-radius:50%;
    width:35px;
    height:35px;
  }

  .mat-card-header{
    display:block;
  }

  .mat-sidenav.mat-sidenav-opened, .mat-sidenav.mat-sidenav-opening{
    -moz-box-shadow: 6px 6px 20px 0px #9b9b9b;
    -webkit-box-shadow: 6px 6px 20px 0px #9b9b9b;
    -o-box-shadow: 6px 6px 20px 0px #9b9b9b;
    box-shadow: 6px 6px 20px 0px #9b9b9b;
    filter:progid:DXImageTransform.Microsoft.Shadow(color=#c0c0c0, Direction=135, Strength=20);
  }

  md-list-item:hover{
    background:#EDEDED;
  }

  .mat-list .mat-list-item .mat-line:nth-child(n+2), .mat-nav-list .mat-list-item .mat-line:nth-child(n+2){
   font-weight:200;
   font-size:0.775rem;
   color:#898685;
  }

  #zpAddConversationMessage{
    flex-direction:inherit !important;

  }

  .mat-input-container{
    width:700px;
  }

  #import{
    width:10px;
  }

  ul{
    overflow: scroll;
    height:500px;
  }

  md-card-content{
    overflow-wrap:break-word;
  }

  #memberLink{
    text-decoration:none;
    color:#13213c;
  }

  h4{
    color:#13213c;
  }
  `]
})
export class DetailsConversationComponent implements OnDestroy, OnChanges {

  @Input() conversation: Conversation;

  readonly view: View = DetailsConversationComponent;

  context = new ReplaySubject<any>();

  private subscriptions: Array<Subscription> = [];

  constructor(private api: ConversationApi) {
    console.log('DetailsConversationComponent::constructor', api);

    this.subscriptions.push(api.onAddConversationMessage.subscribe(({ message }) => {
      console.log('DetailsConversationComponent::onAddConversationMessage', message);
      this.conversation.messages.push(message);
    }));
    this.subscriptions.push(api.onPurgeConversationMessageList.subscribe(() => {
      console.log('DetailsConversationComponent::onPurgeConversationMessageList');
      this.conversation.messages.length = 0;
    }));
  }

  ngOnDestroy() {
    // Remove subscription
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnChanges(changes) {
    const { conversation } = changes;
    if (conversation && conversation.currentValue) {
      this.context.next(conversation.currentValue);
    }
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }, event) {
    console.log('DetailsConversationComponent::onSubmit', value, valid, event);

    if (valid) {
      const parameters = {
        room: this.conversation.room,
        type: 'markup',
        value: {
          text: value.message
        },
        metadata: {

        }
      };
      this.api.addConversationMessage(parameters).then(({ message }) => {
        console.log('DetailsConversationComponent::onAddConversationMessage', message);
      }, (errors) => {
        console.error('DetailsConversationComponent::onAddConversationMessage', errors);
      });
      event.target.reset();
    }
  }

  onPurgConversation($event) {
    this.api.purgeConversationMessageList({
      room: this.conversation.room
    }).then((message) => {
      console.log('DetailsConversationComponent::onPurgeConversationMessageList', message);
    }, (errors) => {
      console.error('DetailsConversationComponent::onPurgeConversationMessageList', errors);
    });
  }

  onRequestConfirmed(request: FileUploadRequest) {
    console.log('DetailsConversationComponent::onRequestConfirmed', request);

    /*
    const parameters = {
      room: this.conversation.room,
      type: 'attachment',
      value: {
        contentType: request.contentType,
        guid: request.transfer.guid,
        path: `${request.folder}/${request.transfer.guid}`
      },
      metadata: {

      }
    };
    this.api.addConversationMessage(parameters).then(({ message }) => {
      console.log('DetailsConversationComponent::onAddConversationMessage', message);
    }, (errors) => {
      console.error('DetailsConversationComponent::onAddConversationMessage', errors);
    });
    */
  }

}
