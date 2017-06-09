import { Component, Input } from '@angular/core';

import { User } from '../';

@Component({
  selector: 'zp-details-user',
  templateUrl: './details-user.component.html',
  styles: [],
})
export class DetailsUserComponent {
  @Input() user: User;
}
