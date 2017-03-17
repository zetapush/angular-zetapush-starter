import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-group-layout',
  template: `
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
export class GroupLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
