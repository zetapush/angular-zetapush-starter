import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-user-layout',
  template: `
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/user/create" routerLinkActive="active">/user/create</a>
      <a routerLink="/user/list" routerLinkActive="active">/user/list</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
