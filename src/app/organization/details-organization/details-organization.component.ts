import { Component, Input } from '@angular/core';

import { Organization } from '../';

@Component({
  selector: 'zp-details-organization',
  template: `
    <p>details-organization</p>
    <pre>{{organization | json}}</pre>
  `,
  styles: []
})
export class DetailsOrganizationComponent {

  @Input() organization: Organization;

}
