import { Component, OnInit } from '@angular/core';

import { User } from '../user-api.service';

@Component({
  selector: 'zp-register-view',
  templateUrl: './register-view.component.html',
  styles: [`
  `]
})
export class RegisterViewComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  onCreateUser(user: User) {
    console.log('CreateUserViewComponent::onCreateUser', user);
  }

}
