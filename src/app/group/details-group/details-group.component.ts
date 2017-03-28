import { Component, Input } from '@angular/core';

import { Group } from '../';

@Component({
  selector: 'zp-details-group',
  templateUrl: './details-group.component.html',
  styles: [`

  `]
})
export class DetailsGroupComponent {

  @Input() actions = false;

  @Input() group: Group;

}
