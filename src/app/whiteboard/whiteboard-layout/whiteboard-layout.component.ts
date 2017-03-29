import { Component } from '@angular/core';

@Component({
  selector: 'zp-whiteboard-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav></nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class WhiteboardLayoutComponent {}
