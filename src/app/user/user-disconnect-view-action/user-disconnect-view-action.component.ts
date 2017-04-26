import { Component } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

// TODO Refactor with Lerna
import { ViewActionComponent } from '../../core';

@Component({
  selector: 'zp-user-disconnect-view-action',
  template: `
    <zp-user-disconnect></zp-user-disconnect>
  `,
  styles: []
})
export class UserDisconnectViewActionComponent implements ViewActionComponent {

  context: ReplaySubject<any>;
  parameters: any;

  onContextInjected(context: ReplaySubject<any>) {
    console.log('UserDisconnectViewActionComponent::onContextInjected', context);
    this.context = context;
    this.context.subscribe((conversation) => {
      console.log('UserDisconnectViewActionComponent::onGetContext', conversation);
    });
  }

}
