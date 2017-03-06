import { Component, OnInit } from '@angular/core';

import { User } from '../user-api.service';

@Component({
  selector: 'zp-list-user-view',
  templateUrl: './list-user-view.component.html',
  styles: [`

  `]
})
export class ListUserViewComponent implements OnInit {

  users: Array<User> = [];

  constructor() { }

  ngOnInit() {
  }

}
