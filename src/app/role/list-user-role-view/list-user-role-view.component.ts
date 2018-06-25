import { Component, OnInit } from '@angular/core';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-list-user-role-view',
  template: `
    <h1>list-user-role-view</h1>
    <mat-list>
      <mat-list-item *ngFor="let role of list">
        <a routerLink="/role/details/{{role.metadata.name}}">{{role.name}}</a>
      </mat-list-item>
    </mat-list>
  `,
  styles: [
    `

  `,
  ],
})
export class ListUserRoleViewComponent implements OnInit {
  list: Array<Role> = [];

  constructor(private api: RoleApi) {}

  ngOnInit() {
    this.getUserRoleList();
  }

  private getUserRoleList() {
    this.api.getUserRoleList().then(
      list => {
        console.log('ListUserRoleViewComponent::getRoleList', list);
        this.list = list;
      },
      errors => {
        console.error('ListUserRoleViewComponent::getRoleList', errors);
      },
    );
  }
}
