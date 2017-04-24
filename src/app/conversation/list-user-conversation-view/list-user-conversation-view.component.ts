import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// TODO Refactor with Lerna
import { User } from '../../user';

import { Conversation, ConversationApi } from '../conversation-api.service';

@Component({
  selector: 'zp-list-user-conversation-view',
  template: `
    <h1>list-user-conversation-view</h1>
    <div id="newConv">
      <zp-autocomplete-organization-members-dialog (select)="onSelectUser($event)"></zp-autocomplete-organization-members-dialog>
    </div>
    <md-menu #menu="mdMenu">
       <button md-menu-item>
          <md-icon>delete</md-icon>
          <span>Supprimer</span>
       </button>
       <button md-menu-item disabled>
          <md-icon>do_not_disturb_off</md-icon>
          <span>Désactiver les notifications</span>
       </button>
       <button md-menu-item>
          <md-icon>archive</md-icon>
          <span>Archiver</span>
       </button>
     </md-menu>

    <div class="mdc-list-group">
      <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo">
        <li class="mdc-list-divider" role="separator"></li>
        <li class="mdc-list-item" *ngFor="let conversation of list">
           <span class="mdc-list-item__start-detail grey-bg" role="presentation">
             <img class="mdc-list-item__start-detail grey-bg" src="./src/assets/img/avatar.png" width="100" height="100" alt="avatar">
           </span>

           <span class="mdc-list-item__text">
           	  <zp-conversation-link class="mdc-list-item__text__primary" [conversation]="conversation"></zp-conversation-link>
              <span id="msg" class="mdc-list-item__text__secondary">
              Dernier message de la conversation eeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeee
              </span>
              <span class="mdc-list-item__text__secondary" id="time">
              13:41
              </span>
           </span>
           <button md-icon-button [mdMenuTriggerFor]="menu">
               <md-icon>more_vert</md-icon>
           </button>
        </li>

      </ul>

    </div>
  `,
  styles: [`
      .mdc-list--two-line .mdc-list-item{
        height:90px;
        padding-left:10px;
        position:relative;
      }

      .mdc-list-item__text__primary{
        text-decoration:none;
        color:#11213b;
        font-weight:500;
      }

      .mdc-list-item:hover{
        background:#EDEDED;
    }

      .mdc-list-item:after{
      content:'';
      width:60px;
      height:2px;
      background:#11213b;
      position:absolute;
      bottom:0;
    }

      #newConv{
        padding-left:225px;
      }

      #newConv:hover{
        background:#EDEDED;
      }

      #time{
        font-size:0.60rem;
        color:#898685;
      }

      #msg{
        overflow:hidden !important;
        white-space:nowrap;
        text-overflow:ellipsis;
        width:417px;
        font-weight:300;
        font-size:0.775rem;
      }

      .mat-icon-button{
        margin-left:40px;
      }

  `]
})
export class ListUserConversationViewComponent implements OnDestroy, OnInit {

  users: Observable<Array<User>>;
  list: Array<Conversation> = [];
  private subscriptions: Array<Subscription> = [];

  constructor(private api: ConversationApi) {
    this.subscriptions.push(api.onCreateConversation.subscribe((conversation) => {
      console.log('onCreateConversation', conversation);
      this.list.push(conversation);
    }));
    this.subscriptions.push(api.onCreateOneToOneConversation.subscribe((conversation) => {
      console.log('onCreateOneToOneConversation', conversation);
      this.list.push(conversation);
    }));
  }

  ngOnDestroy() {
    // Remove subscription
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getUserConversationList();
  }

  private getUserConversationList() {
    this.api.getUserConversationList({}).then((list) => {
      console.log('ListUserGroupViewComponent::onGetUserConversationList', list);
      this.list = list;
    }, (errors) => {
      console.error('ListUserGroupViewComponent::onGetUserConversationList', errors);
    });
  }

  onSelectUser(user: User) {
    console.log('ListUserConversationViewComponent::onSelectUser', user);
    this.api.createOneToOneConversation({
      interlocutor: user.userKey
    }).then((conversation: Conversation) => {
      console.log('ListUserGroupViewComponent::onCreateOneToOneConversation', conversation);
      this.getUserConversationList();
    }, (errors) => {
      console.error('ListUserGroupViewComponent::onCreateOneToOneConversation', errors);
    });
  }

}
