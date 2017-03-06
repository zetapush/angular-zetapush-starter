import { Component } from '@angular/core';

@Component({
  selector: 'zp-home-view',
  template: `
    <h1>{{message}}</h1>
    <nav>
      <a *ngFor="let path of paths" [routerLink]="path">{{path}}</a>
    </nav>
  `,
  styles: [`
    h1 {
      text-align: center;
    }
  `]
})
export class HomeViewComponent {
  paths: Array<string> = ['/user', '/role'];
  message = `Congrats, you're connected to ZetaPush!`;
}
