import { Component, OnInit } from '@angular/core';

// TODO Refactor with Lerna
import { User } from '../../user';

import { Permission, RoleApi } from '../role-api.service';

interface PermissionList {
  [permission: string]: boolean;
}

interface UserPermissionList {
  user: User;
  permissions: PermissionList;
}

const comparator = {
  permission(current, next): number {
    if (current.firstname < next.firstname) {
      return -1;
    } else if (current.firstname > next.firstname) {
      return 1;
    } else {
      return 0;
    }
  }
}

@Component({
  selector: 'zp-permission-grid-view',
  template: `
    <h1>permission-grid-view</h1>
    <zp-autocomplete-organization-members-dialog (select)="onSelectUser($event)"></zp-autocomplete-organization-members-dialog>
    <table>
      <thead>
        <tr>
          <th>Permission</th>
          <th *ngFor="let item of users">
            <a [routerLink]="['/user/details/', item.user.userKey]">{{item.user.login}}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="Row Row--SelectAll">
          <td>
            <strong>SELECT_ALL</strong>
          </td>
          <td *ngFor="let user of users; let i = index;" [style.text-align]="'center'">
            <form class="Form Form--SelectAll">
              <input #input [attr.id]="id('select-all', user.userKey)" (change)="onSelectAll(i, $event)"
                type="checkbox" name="select-all" class="Input Input--Permission" />
              <label [attr.for]="id('select-all', user.userKey)">
                <md-icon>{{ input.checked ? 'check_box': 'check_box_outline_blank' }}</md-icon>
              </label>
            </form>
          </td>
        </tr>
        <tr *ngFor="let permission of permissions" class="Row">
          <td>
            <strong>{{permission.metadata.name}}</strong>
          </td>
          <td *ngFor="let user of users" [style.text-align]="'center'">
            <form class="Form Form--Permission">
              <input [attr.id]="id(permission.id, user.userKey)" [(ngModel)]="user.permissions[permission.metadata.name]"
                type="checkbox" name="{{permission.metadata.name}}" class="Input Input--Permission" />
              <label [attr.for]="id(permission.id, user.userKey)">
                <md-icon>{{ user.permissions[permission.metadata.name] ? 'check_box': 'check_box_outline_blank' }}</md-icon>
              </label>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
    <nav>
      <button md-button (click)="onValidate()">validate</button>
    </nav>
    <pre>{{ users | json }}</pre>
  `,
  styles: [`
    .Form--Permission {
      position: relative;
      overflow: hidden;
    }
    .Input--Permission {
      position: absolute;
      left: -100%;
    }
    .Row--SelectAll {
      border-bottom: 1px dashed black;
    }
  `]
})
export class PermissionGridViewComponent implements OnInit {

  users: Array<UserPermissionList> = [];

  permissions: Array<Permission> = [];

  constructor(private api: RoleApi) { }

  ngOnInit() {
    console.log('PermissionGridViewComponent::ngOnInit');

    this.api.getPermissionList().then((permissions) => {
      console.log('PermissionGridViewComponent::onGetPermissionList', permissions);
      this.permissions = permissions.sort(comparator.permission);
    }, (errors) => {
      console.error('PermissionGridViewComponent::onGetPermissionList', errors);
    });
  }

  onValidate() {
    console.log('PermissionGridViewComponent::onValidate');

    const requests = this.users.map(({ user, permissions }) => this.api.setPermissionListMember({ member: user.userKey, permissions }));
    Promise.all(requests).then((responses) => {
      console.log('PermissionGridViewComponent::onSetPermissionListMember', responses);
    }, (errors) => {
      console.error('PermissionGridViewComponent::onSetPermissionListMember', errors);
    });
  }

  id(permission: string, userKey: string) {
    return `input-user-permission--${permission}--${userKey}`;
  }

  onSelectAll(index, event) {
    console.log('PermissionGridViewComponent::onSelectAll', index, event);
    const permissions = this.permissions.reduce((grants, permission) => {
      grants[permission.metadata.name] = event.target.checked;
      return grants;
    }, {});
    this.users[index].permissions = permissions;
  }

  onSelectUser(user: User) {
    console.log('PermissionGridViewComponent::onSelectUser', user);

    if (!this.users.find((element) => element.user.userKey === user.userKey)) {
      // Add selected user to list
      this.api.getUserPermissionList().then((list) => {
        console.log('PermissionGridViewComponent::onGetUserPermissionList', list);
        const permissions = this.permissions.reduce((grants, permission) => ({
          ...grants,
          [permission.metadata.name]: !!list.find((item) => item.id === permission.id)
        }), {});
        this.users.push({ permissions, user });
      }, (errors) => {
        console.error('PermissionGridViewComponent::onGetUserPermissionList', errors);
      });
    }
  }

}
