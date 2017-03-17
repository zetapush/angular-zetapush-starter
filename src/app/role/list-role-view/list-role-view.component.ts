import { Component, OnInit } from '@angular/core';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-list-role-view',
  templateUrl: './list-role-view.component.html',
  styles: [`

  `]
})
export class ListRoleViewComponent implements OnInit {

  roles: Array<Role> = [];

  constructor(
    private role: RoleApi
  ) {

  }

  ngOnInit() {
    this.getRoleList();
  }

  private getRoleList() {
    this.role.getRoleList().then((roles) => {
      console.log('ListRoleViewComponent::getRoleList', roles);
      this.roles = roles;
    }, (errors) => {
      console.error('ListRoleViewComponent::getRoleList', errors);
    });
  }

}
