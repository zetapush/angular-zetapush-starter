import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserApi } from '../';

@Component({
  selector: 'zp-details-user-view',
  template: `
    <h1>details-user-view</h1>
    <zp-details-user [user]="user"></zp-details-user>
  `,
  styles: []
})
export class DetailsUserViewComponent implements OnInit {

  user: User;

  constructor(private api: UserApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      const userKey = params['userKey'];
      api.getUser({ userKey }).then((user: User) => {
        this.user = user;
      });
    });
  }

  ngOnInit() {
  }

}
