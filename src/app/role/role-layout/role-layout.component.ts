import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-role-layout',
  template: `
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/role/create" routerLinkActive="active">/role/create</a>
      <a routerLink="/role/list" routerLinkActive="active">/role/list</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class RoleLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
