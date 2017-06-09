import { Component, EventEmitter, Output } from '@angular/core';

import { User, UserApi } from '../';

interface CreateUser extends User {
  password: string;
}

@Component({
  selector: 'zp-create-user-form',
  templateUrl: './create-user-form.component.html',
  styles: [
    `

  `,
  ],
})
export class CreateUserFormComponent {
  @Output() create = new EventEmitter<User>();

  constructor(private api: UserApi) {}

  onSubmit({ value, valid }: { value: CreateUser; valid: boolean }) {
    console.log('CreateUserFormComponent::onSubmit', value, valid);

    if (valid) {
      this.api.createUser(value).then(
        user => {
          console.log('CreateUserFormComponent::onCreateUser', user);
          this.create.emit(user);
        },
        errors => {
          console.error('onCreateUser', errors);
        },
      );
    }
  }
}
