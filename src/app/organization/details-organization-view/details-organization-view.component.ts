import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organization, OrganizationApi } from '../';

@Component({
  selector: 'zp-details-organization-view',
  templateUrl: './details-organization-view.component.html',
  styles: []
})
export class DetailsOrganizationViewComponent implements OnInit {

  organization: Organization;

  constructor(private api: OrganizationApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      const name = params['name'];
      api.getOrganization({ name }).then((organization) => {
        console.log('DetailsOrganizationViewComponent::onGetOrganization', organization);
        this.organization = organization;
      }, (errors) => {
        console.error('DetailsOrganizationViewComponent::onGetOrganization', errors);
      });
    });
  }

  ngOnInit() { }

}
