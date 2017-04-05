import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-details-role-view',
  template: `
    <h1>details-role-view</h1>
    <zp-details-group [group]="role"></zp-details-group>
  `,
  styles: [`

  `]
})
export class DetailsRoleViewComponent {

  role: Role;

  constructor(private api: RoleApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      const name = params['name'];
      api.getRole(name).then((role) => {
        console.log('DetailsRoleViewComponent::onGetRole', role);
        this.role = role;
      }, (errors) => {
        console.error('DetailsRoleViewComponent::onGetRole', errors);
      });
    });
  }

}
