import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-details-role-view',
  templateUrl: './details-role-view.component.html',
  styles: [`

  `]
})
export class DetailsRoleViewComponent implements OnInit {

  role: Role;

  constructor(private api: RoleApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      const name = params['name'];
      api.getRole({ name }).then((role) => {
        console.log('DetailsRoleViewComponent::onGetRole', role);
        this.role = role;
      }, (errors) => {
        console.error('DetailsRoleViewComponent::onGetRole', errors);
      });
    });
  }

  ngOnInit() { }

}
