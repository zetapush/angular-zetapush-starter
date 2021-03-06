import { Component } from '@angular/core';

@Component({
  selector: 'zp-root',
  template: `<main><router-outlet></router-outlet></main>`,
  styles: [`
    :host {
      display: flex;
      height: 100%;
      flex-direction: column;
    }
  `]
})
export class AppComponent { }
