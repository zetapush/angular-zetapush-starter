import { Component, Input, OnInit } from '@angular/core';

import { Group } from '../';

@Component({
  selector: 'zp-details-group',
  templateUrl: './details-group.component.html',
  styles: [`

  `]
})
export class DetailsGroupComponent implements OnInit {

  @Input() actions = false;

  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }

}
