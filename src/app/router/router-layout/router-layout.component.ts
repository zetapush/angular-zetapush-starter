import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterState } from '../router-state.service';

@Component({
  selector: 'zp-router-layout',
  template: `
    <md-sidenav-container>
      <md-sidenav #sidenav fxLayout="column">
        <h2>ZetaPush</h2>
        <a routerLink="/home">
          <md-icon>home</md-icon>
        </a>
        <a *ngFor="let path of paths" [routerLink]="path">{{path}}</a>
      </md-sidenav>
      <md-toolbar>
        <button md-button (click)="sidenav.open()">
          <md-icon>dehaze</md-icon>
        </button>
        <md-toolbar-row *ngIf="links.length">
          <nav>
            <a *ngFor="let link of links" [routerLink]="link.path" routerLinkActive="active">{{link.name}}</a>
          </nav>
        </md-toolbar-row>
      </md-toolbar>
      <router-outlet></router-outlet>
    </md-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    md-sidenav-container {
      height: 100%;
    }
    md-sidenav {
      padding: 1rem;
      min-width: 30vw;
    }
    md-sidenav a {
      font-size: 1.2rem;
    }
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
  paths: Array<string> = [];
  constructor(private core: RouterState, private route: ActivatedRoute) {
    core.state.subscribe((modules) => {
      console.log('RouterLayoutComponent', modules);
    });
    this.paths = core.modules.map(({ path }) => path);
    route.data.subscribe(({ links = [] }) => {
      console.log('RouterLayoutComponent', links);
      this.links = links;
    })
  }
}
