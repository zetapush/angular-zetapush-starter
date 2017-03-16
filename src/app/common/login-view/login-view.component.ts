import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

// TODO Refactor with Lerna
import { ZetaPushConnection } from '../../zetapush/core';

class Credentials {
  public login = '';
  public password = '';
}

@Component({
  selector: 'zp-login-view',
  templateUrl: './login-view.component.html',
  styles: [`
  `]
})
export class LoginViewComponent {

  credentials: Credentials;
  error: string;
  handlers: Array<any> = [];

  @HostBinding('class') classes = 'flex-centered flex-height';

  constructor(
    private connection: ZetaPushConnection,
    private router: Router
  ) {
    this.credentials = new Credentials();
  }

  onSubmit() {
    console.log('LoginView::onSubmit', { credentials: this.credentials });
    this.connection
        .connect(this.credentials)
        .then(() => this.onConnectionSuccess(), () => this.onConnectionError());
  }

  onConnectionSuccess() {
    console.log('LoginView::onConnectionSuccess');
    this.error = '';
    this.router.navigate(['/home']);
  }

  onConnectionError() {
    console.log('LoginView::onConnectionError');
    this.error = 'Unable to connect';
  }

}
