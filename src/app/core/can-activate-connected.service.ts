import { ZetaPushClient, ZetaPushConnection } from '../zetapush';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateConnected implements CanActivate {

  constructor (private router: Router, private client: ZetaPushClient, private connection: ZetaPushConnection) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return new Promise((resolve, reject) => {
      const isStronglyAuthenticated = this.client.isStronglyAuthenticated();
      if (isStronglyAuthenticated) {
        if (this.client.isConnected()) {
          resolve(true);
        } else {
          this.connection.connect().then(() => resolve(true), reject);
        }
      } else {
        this.router.navigate(['/login']);
        resolve(false);
      }
    });
  }

}
