import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../';

@Component({
  selector: 'zp-register-view',
  templateUrl: './register-view.component.html',
  styles: [`
  `]
})
export class RegisterViewComponent {

  constructor(private router: Router) { }

  onCreateUser(user: User) {
    console.log('RegisterViewComponent::onCreateUser', user);
    this.router.navigate([
      '/login'
    ]);
  }

}
