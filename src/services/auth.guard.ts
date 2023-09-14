import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}

  /**
   * @description: This will check the users authentication and if its not it will navigate to login page
   * @returns boolean
   */
  canActivate():boolean {
    if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
      return true;
    } else {
      this._router.navigateByUrl('login');
      return false;
    }
  }
}
