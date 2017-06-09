import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../';

@Component({
  selector: 'zp-create-group-view',
  templateUrl: './create-group-view.component.html',
  styles: [],
})
export class CreateGroupViewComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onCreateGroup(group: Group) {
    console.log('CreateGroupViewComponent::onCreateGroup', group);
    this.router.navigate(['/group/list/mine']);
  }
}
