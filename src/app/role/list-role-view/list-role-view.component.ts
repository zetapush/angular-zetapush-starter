import { Component, OnInit } from '@angular/core';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-list-role-view',
  templateUrl: './list-role-view.component.html',
  styles: [`

  `]
})
export class ListRoleViewComponent implements OnInit {

  list: Array<Role> = [];

  constructor( private api: RoleApi) {}

  ngOnInit() {
    this.getRoleList();
  }

  private getRoleList() {
    this.api.getRoleList().then((list) => {
      console.log('ListRoleViewComponent::getRoleList', list);
      this.list = list;
    }, (errors) => {
      console.error('ListRoleViewComponent::getRoleList', errors);
    });
  }

}
