import { Component, Input } from '@angular/core';

import { Role } from '../';

@Component({
  selector: 'zp-details-role',
  template: `
    <p>details-role</p>
    <pre>{{role | json}}</pre>
  `,
  styles: []
})
export class DetailsRoleComponent {

  @Input() role: Role;

}
