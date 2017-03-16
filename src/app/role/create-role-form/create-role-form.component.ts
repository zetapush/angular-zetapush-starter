import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Role, RoleApi } from '../';

@Component({
  selector: 'zp-create-role-form',
  templateUrl: './create-role-form.component.html',
  styles: [`

  `]
})
export class CreateRoleFormComponent implements OnInit {

  @Output() create = new EventEmitter<Role>();

  constructor(private api: RoleApi) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Role, valid: boolean }) {
    console.log('CreateRoleFormComponent::onSubmit', value, valid);

    if (valid) {
      this.api.createRole(value).then((role) => {
        console.log('CreateRoleFormComponent::onCreateUser', role);
        this.create.emit(value);
      }, (errors) => {
        console.error('onCreateRole', errors);
      });
    }
  }

}
