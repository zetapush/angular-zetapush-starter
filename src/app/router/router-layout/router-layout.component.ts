import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReplaySubject } from 'rxjs/ReplaySubject';

// TODO Refactor with Lerna
import { View } from '../../core/';

import { RouterState } from '../router-state.service';

@Component({
  selector: 'zp-router-layout',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav fxLayout="column">
        <h2>ZetaPush</h2>
        <zp-view-action-container [view]="view" [context]="context"></zp-view-action-container>
        <a routerLink="/home">
          <mat-icon>home</mat-icon>
        </a>
        <a *ngFor="let path of paths" [routerLink]="path">{{path}}</a>
      </mat-sidenav>
      <mat-toolbar>
        <button mat-button (click)="sidenav.open()">
          <mat-icon>menu</mat-icon>
        </button>
        <mat-toolbar-row *ngIf="links.length">
          <nav>
            <a *ngFor="let link of links" [routerLink]="link.path" routerLinkActive="active">{{link.name}}</a>
          </nav>
        </mat-toolbar-row>
      </mat-toolbar>
      <router-outlet></router-outlet>
    </mat-sidenav-container>
  `,
  styles: [
    `
    :host {
      display: block;
      height: 100%;
    }
    mat-sidenav-container {
      height: 100%;
    }
    mat-sidenav {
      padding: 1rem;
      min-width: 30vw;
    }
    mat-sidenav a {
      font-size: 1.2rem;
    }
    .active {
      font-weight: bold;
    }
    nav a {
      padding: 0 0.5rem 0 0;
    }
  `,
  ],
})
export class RouterLayoutComponent {
  readonly view: View = RouterLayoutComponent;
  context = new ReplaySubject<any>();
  links: Array<string> = [];
  paths: Array<string> = [];
  constructor(private core: RouterState, private route: ActivatedRoute) {
    core.state.subscribe(modules => {
      console.log('RouterLayoutComponent', modules);
    });
    this.paths = core.modules.map(({ path }) => path);
    route.data.subscribe(({ links = [] }) => {
      console.log('RouterLayoutComponent', links);
      this.links = links;
    });
  }
}
