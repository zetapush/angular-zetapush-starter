import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../';

@Component({
  selector: 'zp-create-user-view',
  template: `
    <h1>create-user-view</h1>
    <zp-create-user-form (create)="onCreateUser($event)"></zp-create-user-form>
  `,
  styles: [
    `
  `,
  ],
})
export class CreateUserViewComponent {
  constructor(private router: Router) {}

  onCreateUser(user: User) {
    console.log('CreateUserViewComponent::onCreateUser', user);
    this.router.navigate(['/home']);
  }
}
