import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// TODO Refactor with Lerna
import { User } from '../../user';

import { Organization, OrganizationApi } from '../';

@Component({
  selector: 'zp-details-organization-view',
  templateUrl: './details-organization-view.component.html',
  styles: []
})
export class DetailsOrganizationViewComponent implements OnInit {

  organization: Organization;
  users: Observable<Array<User>>;
  selection: User;

  constructor(private api: OrganizationApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      const name = params['name'];
      api.getOrganization({ name }).then((organization) => {
        console.log('DetailsOrganizationViewComponent::onGetOrganization', organization);
        this.organization = organization;
        this.users = new Observable<Array<User>>((observer) => {
          observer.next(this.organization.members);
        });
      }, (errors) => {
        console.error('DetailsOrganizationViewComponent::onGetOrganization', errors);
      });
    });
  }

  ngOnInit() { }

  onSelectUser(user: User) {
    console.log('DetailsOrganizationViewComponent::onSelectUser', user);

    this.selection = user;
  }

}
