import { Component, OnInit } from '@angular/core';

import { Group } from '../';

@Component({
  selector: 'zp-details-group-view',
  templateUrl: './details-group-view.component.html',
  styles: []
})
export class DetailsGroupViewComponent implements OnInit {

  group: Group;

  constructor() { }

  ngOnInit() {
    this.group = null;
  }

}
