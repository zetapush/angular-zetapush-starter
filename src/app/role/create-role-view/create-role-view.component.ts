import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Permission,  } from '../permission-api.service';
import { Role } from '../role-api.service';

@Component({
  selector: 'zp-create-role-view',
  template: `
    <h1>create-role-view</h1>
    <zp-create-role-form (create)="onCreateRole($event)" zpHasPermission="createRole"></zp-create-role-form>
    <zp-create-permission-form (create)="onCreatePermission($event)" zpHasPermission="createPermission"></zp-create-permission-form>
  `,
  styles: [`

  `]
})
export class CreateRoleViewComponent {

  constructor(private router: Router) { }

  onCreateRole(role: Role) {
    console.log('CreateRoleViewComponent::onCreateRole', role);
    this.router.navigate([
      '/role/list/all'
    ]);
  }

  onCreatePermission(permission: Permission) {
    console.log('CreateRoleViewComponent::onCreatePermission', permission);
  }

}
