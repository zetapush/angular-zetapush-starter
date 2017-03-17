import { Component, Input, OnInit } from '@angular/core';

import { Organization } from '../';

@Component({
  selector: 'zp-details-organization',
  templateUrl: './details-organization.component.html',
  styles: []
})
export class DetailsOrganizationComponent implements OnInit {

  @Input() organization: Organization;

  constructor() { }

  ngOnInit() {
  }

}
