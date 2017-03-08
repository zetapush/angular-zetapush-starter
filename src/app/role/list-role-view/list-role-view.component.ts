import { Component, OnInit } from '@angular/core';

import { Role, RoleApi } from '../index';

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
    this.listRole();
  }

  private listRole() {
    this.role.listRole().then((roles) => {
      console.log('ListRoleViewComponent::listRole', roles);
      this.roles = roles;
    }, (errors) => {
      console.error('ListRoleViewComponent::listRole', errors);
    });
  }

}
