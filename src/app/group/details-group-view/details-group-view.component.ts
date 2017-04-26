import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

// TODO Refactor with Lerna
import { View } from '../../core/';
// TODO Refactor with Lerna
import { User } from '../../user';

import { Group, GroupApi } from '../group-api.service';

@Component({
  selector: 'zp-details-group-view',
  template: `
    <h1>details-group-view</h1>
    <zp-details-user-group [group]="group"></zp-details-user-group>
    <zp-view-action-container [view]="view" [context]="context"></zp-view-action-container>
  `,
  styles: []
})
export class DetailsGroupViewComponent implements OnDestroy {

  readonly view: View = DetailsGroupViewComponent;

  context = new ReplaySubject<Group>();

  group: Group;

  subscriptions: Array<Subscription> = [];

  constructor(private api: GroupApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      console.log('DetailsGroupViewComponent::params', params);
      this.getGroup(params.id);
    });
    this.subscriptions.push(api.onAddGroupMember.subscribe((membership) => {
      console.log('DetailsGroupViewComponent::onAddGroupMember', membership);
      if (this.group && this.group.id === membership.id) {
        this.getGroup(membership.id);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private getGroup(id: string) {
    this.api.getGroup({ id }).then((group: Group) => {
      this.group = group;
      this.context.next(group);
    });
  }
}
