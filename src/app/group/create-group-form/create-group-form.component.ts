import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import slugify from 'slugify';

import { Group, GroupApi } from '../';

const alphanumericify = value =>
  slugify(value).replace(/\-/g, '').toLowerCase();

@Component({
  selector: 'zp-create-group-form',
  templateUrl: './create-group-form.component.html',
  styles: [],
})
export class CreateGroupFormComponent implements OnInit {
  @Output() create = new EventEmitter<Group>();

  constructor(private api: GroupApi) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Group; valid: boolean }) {
    console.log('CreateGroupFormComponent::onSubmit', value, valid);

    if (valid) {
      const parameters = {
        ...value,
        id: alphanumericify(value.name),
      };
      this.api.createGroup(parameters).then(
        group => {
          console.log('CreateGroupFormComponent::onCreateUser', group);
          this.create.emit(value);
        },
        errors => {
          console.error('onCreateGroup', errors);
        },
      );
    }
  }
}
