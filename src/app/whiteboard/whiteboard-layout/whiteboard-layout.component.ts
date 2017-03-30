import { Component } from '@angular/core';

@Component({
  selector: 'zp-whiteboard-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/whiteboard/list" routerLinkActive="active">/whiteboard/list</a>
      <a routerLink="/whiteboard/details/example" routerLinkActive="active">/whiteboard/details/example</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class WhiteboardLayoutComponent {}
