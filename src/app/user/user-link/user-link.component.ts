import { Component, Input, OnInit } from '@angular/core';

import { User } from '../user-api.service';
import { UserCache } from '../user-cache.service';

@Component({
  selector: 'zp-user-link',
  template: `
    <a [routerLink]="['/user/details', userKey]">@{{ user?.login }}</a>
  `,
  styles: [],
})
export class UserLinkComponent implements OnInit {
  @Input() userKey: string;

  user: User;

  constructor(private cache: UserCache) {}

  ngOnInit() {
    this.cache.get(this.userKey).subscribe(user => {
      this.user = user;
    });
  }
}
