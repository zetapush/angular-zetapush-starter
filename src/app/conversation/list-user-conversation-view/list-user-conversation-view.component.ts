import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// TODO Refactor with Lerna
import { User } from '../../user';

import { Conversation, ConversationApi } from '../';

@Component({
  selector: 'zp-list-user-conversation-view',
  templateUrl: './list-user-conversation-view.component.html',
  styles: [`

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
