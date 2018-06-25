import { Component, EventEmitter, Output } from '@angular/core';

import { ApiError, Role, RoleApi } from '../role-api.service';

@Component({
  selector: 'zp-create-role-form',
  template: `
    <form mdContent (ngSubmit)="onSubmit(form)" novalidate #form="ngForm" fxLayout="column" id="zpCreateRoleForm">
      <h3>Create Role</h3>
      <mat-form-field>
        <input matInput ngModel name="name" type="text" placeholder="Name" required />
      </mat-form-field>
      <zp-ui-error [errors]="errors"></zp-ui-error>
      <button mat-button [disabled]="form.invalid" form="zpCreateRoleForm">Submit</button>
    </form>
  `,
  styles: [
    `

  `,
  ],
})
export class CreateRoleFormComponent {
  @Output() create = new EventEmitter<Role>();

  errors: Array<ApiError> = [];

  constructor(private api: RoleApi) {}

  onSubmit({ value, valid }: { value: Role; valid: boolean }) {
    console.log('CreateRoleFormComponent::onSubmit', value, valid);

    if (valid) {
      this.errors = [];
      this.api.createRole(value.name).then(
        (role: Role) => {
          console.log('CreateRoleFormComponent::onCreateRole', role);
          this.create.emit(role);
        },
        errors => {
          console.error('onCreateRole', errors);
          this.errors = errors;
        },
      );
    }
  }
}
