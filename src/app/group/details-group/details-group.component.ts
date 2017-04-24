import { Component, Input } from '@angular/core';

import { Group } from '../';

@Component({
  selector: 'zp-details-group',
  templateUrl: './details-group.component.html',
  styles: [`
  .mdc-list-item a{
    color:#13213c;
    text-decoration:none;
  }

  .mdc-list-item{
    padding:5px;
  }

  .mdc-list-item:hover{
    background:#EDEDED;
  }
  `]
})
export class DetailsGroupComponent {

  @Input() actions = false;

  @Input() group: Group;

}
