import { Component, HostBinding } from '@angular/core';
import { ZetaPushConnection } from './zetapush';

@Component({
  selector: 'zp-root',
  template: `<main><router-outlet></router-outlet></main>`,
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
  @HostBinding('class.connected') isConnected = false;
  constructor(private connection: ZetaPushConnection) {
    console.log('AppComponent::constructor', connection);
    connection.connect().then(() => this.isConnected = true);
  }
}
