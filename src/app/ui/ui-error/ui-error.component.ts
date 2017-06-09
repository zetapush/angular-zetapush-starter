import { Component, Input } from '@angular/core';

interface ApiError {
  code: string;
  location: string;
  message: string;
}

@Component({
  selector: 'zp-ui-error',
  template: `
    <ul class="List List--Error">
      <li *ngFor="let error of errors" class="Error">
        <strong class="Error_Code">{{error.code}}</strong>
        <span class="Error_Message">{{error.message}}</span>
      </li>
    </ul>
  `,
  styles: [
    `
    .List--Error {
      color: rgb(229, 80, 49);
    }
  `,
  ],
})
export class UiErrorComponent {
  @Input() errors: Array<ApiError> = [];
}
