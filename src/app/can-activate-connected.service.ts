import { ZetaPushClient } from './../zetapush';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateConnected implements CanActivate {

  constructor (private router: Router, private client: ZetaPushClient) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    const isStronglyAuthenticated = this.client.isStronglyAuthenticated();
    if (!isStronglyAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isStronglyAuthenticated;
  }

}
