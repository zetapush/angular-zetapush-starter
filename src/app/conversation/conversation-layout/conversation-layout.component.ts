import { Component } from '@angular/core';

@Component({
  selector: 'zp-conversation-layout',
  template: `
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/conversation/list/mine" routerLinkActive="active">/conversation/list/mine</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class ConversationLayoutComponent {}
