import { ZetaPushClient } from '../../zetapush';

import { Component, OnInit } from '@angular/core';

import { services } from 'zetapush-js';

class UserApi extends services.Macro {
  static DEFAULT_DEPLOYMENT_ID = services.Macro.DEFAULT_DEPLOYMENT_ID;
  createUser({ login, password, email, firstname, lastname }) {
    return this.$publish('createUser', { login, password, email, firstname, lastname }, false);
  }
}

console.log('UserApi', UserApi);

interface User {
  login: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'zp-create-user-view',
  templateUrl: './create-user-view.component.html',
  styles: [`
  `]
})
export class CreateUserViewComponent implements OnInit {

  api: UserApi;

  userKey: string;

  constructor(private client: ZetaPushClient) { }

  ngOnInit() {
    this.api = this.client.createAsyncMacroService({
      Type: UserApi
    }) as UserApi;
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log('CreateUserViewComponent::onSubmit', value, valid);

    if (valid) {
      this.api.createUser(value).then((response) => {
        console.log('onCreateUser', response);

        this.userKey = response.user.userKey;
      }, (errors) => {
        console.error('onCreateUser', errors);
      });
    }
  }

}
