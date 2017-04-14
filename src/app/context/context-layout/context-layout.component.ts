import { Component } from '@angular/core';

@Component({
  selector: 'zp-context-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/context/list/all" routerLinkActive="active">/context/list/all</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class ContextLayoutComponent {}
