import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../';

@Component({
  selector: 'zp-create-user-view',
  templateUrl: './create-user-view.component.html',
  styles: [`
  `]
})
export class CreateUserViewComponent {

  constructor(private router: Router) { }

  onCreateUser(user: User) {
    console.log('CreateUserViewComponent::onCreateUser', user);
    this.router.navigate([
      '/user/list'
    ]);
  }

}
