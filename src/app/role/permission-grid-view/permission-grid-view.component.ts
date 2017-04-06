import { Component, OnInit } from '@angular/core';

import { RoleApi } from '../role-api.service';

@Component({
  selector: 'zp-permission-grid-view',
  template: `
    <h1>permission-grid-view</h1>
    <table>
      <thead>
        <tr>
          <th>Permission</th>
          <th *ngFor="let user of users">User({{user.userKey}})</th>
        </tr>
      </thead>
      <tbody>
        <tr class="Row Row--SelectAll">
          <td>
            <strong>SELECT_ALL</strong>
          </td>
          <td *ngFor="let user of users" [style.text-align]="'center'">
            <form class="Form Form--SelectAll">
              <input #input [attr.id]="id('select-all', user.userKey)" (change)="onSelectAll(index, $event)"
                type="checkbox" name="select-all" class="Input Input--Permission" />
              <label [attr.for]="id('select-all', user.userKey)">
                <md-icon>{{ input.checked ? 'check_box': 'check_box_outline_blank' }}</md-icon>
              </label>
            </form>
          </td>
        </tr>
        <tr *ngFor="let permission of permissions" class="Row">
          <td>
            <strong>{{permission}}</strong>
          </td>
          <td *ngFor="let user of users" [style.text-align]="'center'">
            <form class="Form Form--Permission">
              <input [attr.id]="id(permission, user.userKey)" [(ngModel)]="user.permissions[permission]"
                type="checkbox" name="{{permission}}" class="Input Input--Permission" />
              <label [attr.for]="id(permission, user.userKey)">
                <md-icon>{{ user.permissions[permission] ? 'check_box': 'check_box_outline_blank' }}</md-icon>
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

  users: Array<any> = [
    { userKey: 'NbUU-9IiQa-MS03wsB8DpA', permissions: {} },
    { userKey: 'ZoysUwB78Bzt55hDzF1Jzg', permissions: {} },
    { userKey: 'uvdOB1D-wdJZzE8sQI2O2g', permissions: {} }
  ];

  permissions: Array<string> = [
    // Member
    'addPermissionMember',
    'addRoleMember',
    'removePermissionMember',
    'removeRoleMember',
    // Permission
    'createPermission',
    'deletePermission',
    'getPermissionList',
    // Role
    'createRole',
    'deleteRole',
    'getRoleList'
  ];

  constructor(private api: RoleApi) { }

  ngOnInit() {
    console.log('PermissionGridViewComponent::ngOnInit');
  }

  onValidate() {
    console.log('PermissionGridViewComponent::onValidate');
  }

  id(permission: string, userKey: string) {
    return `input-user-permission--${permission}--${userKey}`;
  }

  onSelectAll(index, event) {
    console.log('PermissionGridViewComponent::onSelectAll', index, event);
    const permissions = this.permissions.reduce((grants, permission) => {
      grants[permission] = event.target.checked;
      return grants;
    }, {});
    this.users[index].permissions = permissions;
  }

}
