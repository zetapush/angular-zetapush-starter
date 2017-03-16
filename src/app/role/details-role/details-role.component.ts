import { Component, Input, OnInit } from '@angular/core';

import { Role } from '../';

@Component({
  selector: 'zp-details-role',
  templateUrl: './details-role.component.html',
  styles: []
})
export class DetailsRoleComponent implements OnInit {

  @Input() role: Role;

  constructor() { }

  ngOnInit() { }

}
