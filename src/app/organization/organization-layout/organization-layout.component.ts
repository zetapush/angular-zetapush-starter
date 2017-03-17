import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-organization-layout',
  template: `
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a routerLink="/organization/list" routerLinkActive="active">/organization/list</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class OrganizationLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
