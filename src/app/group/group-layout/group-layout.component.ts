import { Component } from '@angular/core';

@Component({
  selector: 'zp-group-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/group/list/mine" routerLinkActive="active">/group/list/mine</a>
      <a routerLink="/group/create" routerLinkActive="active">/group/create</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class GroupLayoutComponent {}
