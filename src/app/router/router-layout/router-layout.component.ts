import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'zp-router-layout',
  template: `
    <nav>
      <a routerLink="/home">/home</a>
    </nav>
    <nav>
      <a *ngFor="let link of links" [routerLink]="link.path" routerLinkActive="active">{{link.name}}</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
    nav a {
      padding: 0 0.5rem 0 0;
    }
  `]
})
export class RouterLayoutComponent {
  links: Array<string> = [];
  constructor(private route: ActivatedRoute) {
    route.data.subscribe(({ links = [] }) => {
      console.log('RouterLayoutComponent', links);
      this.links = links;
    })
  }
}
