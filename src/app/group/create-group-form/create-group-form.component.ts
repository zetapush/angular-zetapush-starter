import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Group, GroupApi } from '../';

@Component({
  selector: 'zp-create-group-form',
  templateUrl: './create-group-form.component.html',
  styles: []
})
export class CreateGroupFormComponent implements OnInit {

  @Output() create = new EventEmitter<Group>();

  constructor(private api: GroupApi) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Group, valid: boolean }) {
    console.log('CreateGroupFormComponent::onSubmit', value, valid);

    if (valid) {
      this.api.createGroup(value).then((group) => {
        console.log('CreateGroupFormComponent::onCreateUser', group);
        this.create.emit(value);
      }, (errors) => {
        console.error('onCreateGroup', errors);
      });
    }
  }

}
