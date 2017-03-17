import { Component, Input, OnInit } from '@angular/core';

import { User } from '../';

@Component({
  selector: 'zp-details-user',
  templateUrl: './details-user.component.html',
  styles: []
})
export class DetailsUserComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
