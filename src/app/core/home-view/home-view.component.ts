import { Component } from '@angular/core';
import { CoreState } from '../core-state.service';


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
    nav a {
      padding: 0 0 0 1rem;
    }
  `]
})
export class HomeViewComponent {
  paths: Array<string> = [];
  message = `Congrats, you're connected to ZetaPush!`;
  constructor(private core: CoreState) {
    console.log('HomeViewComponent::constructor', core);
    core.state.subscribe((modules) => {
      console.log('HomeViewComponent', modules);
    });
    this.paths = core.modules.map(({ path }) => path);
  }
}
