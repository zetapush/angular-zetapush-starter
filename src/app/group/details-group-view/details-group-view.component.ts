import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Group, GroupApi } from '../';

@Component({
  selector: 'zp-details-group-view',
  templateUrl: './details-group-view.component.html',
  styles: []
})
export class DetailsGroupViewComponent implements OnInit {

  group: Group;

  constructor(private api: GroupApi, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      console.log('DetailsGroupViewComponent::params', params);
      const id = params['id'];
      api.getGroup({ id }).then((group: Group) => {
        this.group = group;
      });
    });
  }

  ngOnInit() {
  }

}
