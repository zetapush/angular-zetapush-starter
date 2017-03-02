import { Component } from '@angular/core';

@Component({
  selector: 'zp-home-view',
  template: `<h1>{{message}}</h1>`,
  styles: [`
    h1 {
      text-align: center;
    }
  `]
})
export class HomeViewComponent {
  message = `Congrats, you're connected to ZetaPush!`;
}
