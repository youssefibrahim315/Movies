import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { rout } from '../config/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  currentUrl: any;
constructor(private router: Router,private AuthService: AuthService) {}
canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.AuthService.getAuthTokenFromLocalStorage();
      if (token) {
        // this.router.navigate([rout.movies.home]);
        return true;
      } else {
        this.router.navigate([rout.movies.login]);
        return false;
      }
    }
}
