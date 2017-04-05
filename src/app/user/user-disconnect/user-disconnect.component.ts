import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ZetaPushConnection } from '../../zetapush';

@Component({
  selector: 'zp-user-disconnect',
  template: `
    <button md-button (click)="onClick($event)"><md-icon>forward</md-icon></button>
  `,
  styles: []
})
export class UserDisconnectComponent {

  constructor(private connection: ZetaPushConnection, private router: Router) { }

  onClick() {
    this.connection.disconnect().then(() => this.router.navigate(['/login']));
  }

}
