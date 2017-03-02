import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-user-layout',
  template: `
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`

  `]
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
