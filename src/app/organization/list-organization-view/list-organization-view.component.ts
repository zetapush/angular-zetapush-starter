import { Component, OnInit } from '@angular/core';

import { Organization, OrganizationApi } from '../';

@Component({
  selector: 'zp-list-organization-view',
  templateUrl: './list-organization-view.component.html',
  styles: []
})
export class ListOrganizationViewComponent implements OnInit {

  list: Array<Organization> = [];

  constructor(private api: OrganizationApi) {}

  ngOnInit() {
    this.getOrganizationList();
  }

  private getOrganizationList() {
    this.api.getOrganizationList().then((list) => {
      console.log('ListOrganizationViewComponent::getOrganizationList', list);
      this.list = list;
    }, (errors) => {
      console.error('ListOrganizationViewComponent::getOrganizationList', errors);
    });
  }

}
