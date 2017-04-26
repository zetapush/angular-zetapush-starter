import { Component, Input } from '@angular/core';

import { Group } from '../';

@Component({
  selector: 'zp-details-user-group',
  templateUrl: './details-user-group.component.html',
  styles: [`
  .mdc-list-item a{
    color:#13213c;
    text-decoration:none;
    font-weight:500;
  }

  .mdc-list-item{
    padding:5px;
    height:75px;
    position:relative;
  }

  .mdc-list-item:hover{
    background:#EDEDED;
  }

  .mdc-list-item:after{
      content:'';
      width:60px;
      height:2px;
      background:#11213b;
      position:absolute;
      bottom:0;
    }

    #delete{
      opacity:0.3;
    }
  `]
})
export class DetailsUserGroupComponent {

  @Input() actions = false;

  @Input() group: Group;

}
