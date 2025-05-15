import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return authState(this.auth).pipe(
      take(1),
      map((user) => {
        const isLoggedIn = !!user;
        const isLoginRoute = route.routeConfig?.path === 'admin/login';

        if (isLoggedIn && isLoginRoute) {
          return this.router.parseUrl('admin');
        }

        if (!isLoggedIn && !isLoginRoute) {
          return this.router.parseUrl('admin/login');
        }

        return true;
      })
    );
  }
}
