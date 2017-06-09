import { Component, EventEmitter, Output } from '@angular/core';

import { ApiError, Permission, PermissionApi } from '../permission-api.service';

@Component({
  selector: 'zp-create-permission-form',
  template: `
    <form mdContent (ngSubmit)="onSubmit(form)" novalidate #form="ngForm" fxLayout="column" id="zpCreatePermissionForm">
      <h3>Create Permission</h3>
      <md-input-container>
        <input mdInput ngModel name="name" type="text" placeholder="Name" required />
      </md-input-container>
      <zp-ui-error [errors]="errors"></zp-ui-error>
      <button md-button [disabled]="form.invalid" form="zpCreatePermissionForm">Submit</button>
    </form>
  `,
  styles: [
    `

  `,
  ],
})
export class CreatePermissionFormComponent {
  @Output() create = new EventEmitter<Permission>();

  errors: Array<ApiError> = [];

  constructor(private api: PermissionApi) {}

  onSubmit({ value, valid }: { value: Permission; valid: boolean }) {
    console.log('CreatePermissionFormComponent::onSubmit', value, valid);

    if (valid) {
      this.errors = [];
      this.api.createPermission(value.name).then(
        (permission: Permission) => {
          console.log(
            'CreatePermissionFormComponent::onCreatePermission',
            permission,
          );
          this.create.emit(permission);
        },
        errors => {
          this.errors = errors;
          console.error('onCreatePermission', errors);
        },
      );
    }
  }
}
