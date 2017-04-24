import { Component, Input } from '@angular/core';

import { User } from '../';

@Component({
  selector: 'zp-details-user',
  template: `
    <p>details-user</p>
    <div>
      <div><label>Login: </label><span>{{user?.login}}</span></div>
      <div><label>Email: </label><span>{{user?.email}}</span></div>
      <div><label>Firstname: </label><span>{{user?.firstname}}</span></div>
      <div><label>Lastname: </label><span>{{user?.lastname}}</span></div>
      <div><zp-user-avatar [avatar]="user?.avatar"></zp-user-avatar></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      border: 1px dashed #333;
    }
  `]
})
export class DetailsUserComponent {

  @Input() user: User;

}
