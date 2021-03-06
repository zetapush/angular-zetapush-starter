import { Component } from '@angular/core';

@Component({
  selector: 'zp-role-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/role/grid" routerLinkActive="active">/role/grid</a>
      <a routerLink="/role/list/mine" routerLinkActive="active">/role/list/mine</a>
      <a routerLink="/role/list/all" routerLinkActive="active">/role/list/all</a>
      <a routerLink="/role/create" routerLinkActive="active">/role/create</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class RoleLayoutComponent {}
