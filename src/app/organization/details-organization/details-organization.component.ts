import { Component, Input } from '@angular/core';

import { Organization } from '../';

@Component({
  selector: 'zp-details-organization',
  templateUrl: './details-organization.component.html',
  styles: []
})
export class DetailsOrganizationComponent {

  @Input() organization: Organization;

}
