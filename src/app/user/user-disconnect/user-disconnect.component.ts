import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZetaPushConnection } from 'zetapush-angular';

@Component({
  selector: 'zp-user-disconnect',
  template: `
    <button mat-button (click)="onClick()"><mat-icon>forward</mat-icon></button>
  `,
  styles: [
    `

  `,
  ],
})
export class UserDisconnectComponent {
  constructor(private connection: ZetaPushConnection, private router: Router) {}

  onClick() {
    this.connection.disconnect().then(() => this.router.navigate(['/login']));
  }
}
