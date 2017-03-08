import { Component, OnInit } from '@angular/core';

import { User } from '../index';

@Component({
  selector: 'zp-create-user-view',
  templateUrl: './create-user-view.component.html',
  styles: [`
  `]
})
export class CreateUserViewComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  onCreateUser(user: User) {
    console.log('CreateUserViewComponent::onCreateUser', user);
  }

}
