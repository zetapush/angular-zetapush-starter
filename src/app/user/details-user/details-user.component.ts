import { Component, Input } from '@angular/core';

import { User } from '../';

@Component({
  selector: 'zp-details-user',
  template: `
    <p>details-user</p>
    <div>
        <img id="avatar" src="./src/assets/img/avatar.png" width="100" height="100" alt="avatar">
    </div>
    <ul class="mdc-list mdc-list--two-line">
      <li class="mdc-list-item">
        <span class="material-icons mdc-list-item__start-detail" aria-hidden="true">person</span>
        <span class="mdc-list-item__text">User Name
            <span class="mdc-list-item__text__secondary">{{user?.login}}</span>
        </span>
      </li>
      <li class="mdc-list-item">
        <span class="material-icons mdc-list-item__start-detail" aria-hidden="true">email</span>
        <span class="mdc-list-item__text">E-mail
            <span class="mdc-list-item__text__secondary">{{user?.email}}</span>
        </span>
      </li>
      <li class="mdc-list-item">
        <span class="material-icons mdc-list-item__start-detail" aria-hidden="true">filter_1</span>
        <span class="mdc-list-item__text">First Name
            <span class="mdc-list-item__text__secondary">{{user?.firstname}}</span>
        </span>
      </li>
       <li class="mdc-list-item">
        <span class="material-icons mdc-list-item__start-detail" aria-hidden="true">filter_2</span>
        <span class="mdc-list-item__text">Last Name
            <span class="mdc-list-item__text__secondary">{{user?.lastname}}</span>
        </span>
      </li>
      <div><zp-user-avatar [avatar]="user?.avatar"></zp-user-avatar></div>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
      border: 1px dashed #333;
    }

    #avatar{
      overflow:hidden;
    -webkit-border-radius:80px;
    -moz-border-radius:80px;
    border-radius:80px;
    width:90px;
    height:90px;
    margin-left:45px;
  }

  .mdc-list-item__text, .mdc-list-item__start-detail{
    font-weight:500;
    color: #11213b;
  }
  `]
})
export class DetailsUserComponent {

  @Input() user: User;

}
