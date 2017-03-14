import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { User } from '../';

@Component({
  selector: 'zp-list-user-view',
  templateUrl: './list-user-view.component.html',
  styles: [`

  `]
})
export class ListUserViewComponent implements OnInit {

  selection: User;

  users: Observable<Array<User>> = Observable.of([
    { login: 'ghoullier', password: '', email: 'ghoullier@zetapush.com', firstname: 'Grégory', lastname: 'Houllier', userKey: 'GH' },
    { login: 'jcmichel', password: '', email: 'jcmichel@zetapush.com', firstname: 'Jean-Charles', lastname: 'Michel', userKey: 'JC' },
    { login: 'mmorvan', password: '', email: 'mmorvan@zetapush.com', firstname: 'Mikael', lastname: 'Morvan', userKey: 'MM' },
    { login: 'pabreu', password: '', email: 'pabreu@zetapush.com', firstname: 'Pablo', lastname: 'Abreu', userKey: 'PA' },
    { login: 'rmillet', password: '', email: 'rmillet@zetapush.com', firstname: 'Raphael', lastname: 'Millet', userKey: 'RM' }
  ]);

  constructor() { }

  ngOnInit() { }

  onSelectUser(user: User) {
    console.log('ListUserViewComponent::onSelectUser', user);

    this.selection = user;
  }

}
