import { Component } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

// TODO Refactor with Lerna
import { ViewActionComponent } from '../../core';

@Component({
  selector: 'zp-user-badge-view-action',
  template: `
    <zp-user-badge></zp-user-badge>
  `,
  styles: []
})
export class UserBadgeViewActionComponent implements ViewActionComponent {

  context: ReplaySubject<any>;
  parameters: any;

  onContextInjected(context: ReplaySubject<any>) {
    console.log('UserBadgeViewActionComponent::onContextInjected', context);
    this.context = context;
    this.context.subscribe((conversation) => {
      console.log('UserBadgeViewActionComponent::onGetContext', conversation);
    });
  }

}
