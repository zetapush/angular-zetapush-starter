import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [`
    :host {
      display: flex;
      height: 100%;
      flex-direction: column;
      h1 {
        color: red;
      }
    }
  `]
})
export class AppComponent {
  title = 'app works!';
}
