import { Component } from '@angular/core';

@Component({
  selector: 'zp-file-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/file/list" routerLinkActive="active">/file/list</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class FileLayoutComponent {}
