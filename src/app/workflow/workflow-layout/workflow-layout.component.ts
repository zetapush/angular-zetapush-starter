import { Component } from '@angular/core';

@Component({
  selector: 'zp-workflow-layout',
  template: `
    <zp-user-badge></zp-user-badge>
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/workflow/list/all" routerLinkActive="active">/workflow/list/all</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class WorkflowLayoutComponent {}
