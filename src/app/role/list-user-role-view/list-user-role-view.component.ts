import { Component, OnInit } from '@angular/core';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-list-user-role-view',
  templateUrl: './list-user-role-view.component.html',
  styles: [`

  `]
})
export class ListUserRoleViewComponent implements OnInit {

  list: Array<Role> = [];

  constructor(private api: RoleApi) {}

  ngOnInit() {
    this.getUserRoleList();
  }

  private getUserRoleList() {
    this.api.getUserRoleList().then((list) => {
      console.log('ListUserRoleViewComponent::getRoleList', list);
      this.list = list;
    }, (errors) => {
      console.error('ListUserRoleViewComponent::getRoleList', errors);
    });
  }

}
