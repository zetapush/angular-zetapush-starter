import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from '../';

@Component({
  selector: 'zp-create-role-view',
  templateUrl: './create-role-view.component.html',
  styles: [`

  `]
})
export class CreateRoleViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCreateRole(role: Role) {
    console.log('CreateRoleViewComponent::onCreateRole', role);
    this.router.navigate([
      '/role/list/all'
    ]);
  }

}
