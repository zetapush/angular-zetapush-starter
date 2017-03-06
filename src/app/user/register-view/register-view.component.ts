import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user-api.service';

@Component({
  selector: 'zp-register-view',
  templateUrl: './register-view.component.html',
  styles: [`
  `]
})
export class RegisterViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  onCreateUser(user: User) {
    console.log('RegisterViewComponent::onCreateUser', user);
    this.router.navigate([
      '/login'
    ]);
  }

}
