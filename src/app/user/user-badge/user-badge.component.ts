import { Component, Input, OnInit } from '@angular/core';
import { ZetaPushClient } from 'zetapush-angular';

import { User } from '../user-api.service';
import { UserCache } from '../user-cache.service';

@Component({
  selector: 'zp-user-badge',
  template: `
    <span>Welcome</span>
    <strong>{{ user.login }}</strong>
  `,
  styles: [],
})
export class UserBadgeComponent implements OnInit {
  @Input() userKey: string;

  user: User;

  constructor(private cache: UserCache, private client: ZetaPushClient) {
    this.userKey = client.getUserId();
  }

  ngOnInit() {
    this.cache.get(this.userKey).subscribe(user => {
      this.user = user;
    });
  }
}
