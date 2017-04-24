import { Component, Input } from '@angular/core';

@Component({
  selector: 'zp-user-avatar',
  template: `
    <pre>{{avatar | json}}</pre>
  `,
  styles: [`
    :host {
      display: block;
      border: 1px dashed #333;
    }
  `]
})
export class UserAvatarComponent {

  @Input() avatar: any;

}
