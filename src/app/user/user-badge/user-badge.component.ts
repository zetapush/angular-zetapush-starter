import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { User, UserApi } from '../';

@Component({
  selector: 'zp-user-badge',
  template: `
    <strong>{{ user?.login }}</strong>
  `,
  styles: []
})
export class UserBadgeComponent implements OnDestroy, OnInit {

  user: User;
  subscriptions: Array<Subscription> = [];

  constructor(private api: UserApi) {
    this.subscriptions.push(api.onUpdateUser.subscribe(({ user }) => {
      console.log('UserBadgeComponent::onUpdateUser', user);
    }));
  }

  ngOnDestroy() {
    // Remove subscription
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.api.getUser({}).then((user) => {
      this.user = user;
    });
  }

}
