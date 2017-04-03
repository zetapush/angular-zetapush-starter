import { Component, Input } from '@angular/core';

import { Role } from '../';

@Component({
  selector: 'zp-details-role',
  templateUrl: './details-role.component.html',
  styles: []
})
export class DetailsRoleComponent {

  @Input() role: Role;

}
