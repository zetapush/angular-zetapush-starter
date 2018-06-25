import { Component, OnInit } from '@angular/core';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-list-role-view',
  template: `
    <h1>list-role-view</h1>
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
export class ListRoleViewComponent implements OnInit {
  list: Array<Role> = [];

  constructor(private api: RoleApi) {}

  ngOnInit() {
    this.getRoleList();
  }

  private getRoleList() {
    this.api.getRoleList().then(
      list => {
        console.log('ListRoleViewComponent::getRoleList', list);
        this.list = list;
      },
      errors => {
        console.error('ListRoleViewComponent::getRoleList', errors);
      },
    );
  }
}
