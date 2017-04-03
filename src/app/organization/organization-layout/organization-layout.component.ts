import { Component } from '@angular/core';

@Component({
  selector: 'zp-organization-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/organization/list/mine" routerLinkActive="active">/organization/list/mine</a>
      <a routerLink="/organization/list/all" routerLinkActive="active">/organization/list/all</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class OrganizationLayoutComponent {}
