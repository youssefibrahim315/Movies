import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { baseURL, rout } from 'src/app/core/config/routes';
import { HttpService } from 'src/app/shared/services/http.service';
import { login } from '../models/login.interface copy';
import { register } from '../models/register.interface';
import * as SecureLS from "secure-ls";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = baseURL;
  ls = new SecureLS({ encodingType: "aes" }); // encoding data before storing it to localStorage
  constructor(private HttpService: HttpService, private router: Router) { }

  login(data: login): Observable<any> {
    const url = this.baseURL + rout.Api.auth.signIn ;
    return this.HttpService.createPostRequest(url, data).pipe(map(user => {
      this.ls.set('Token',  user.authorisation.token );
      return user;
    }));
  }
  register(data: register): Observable<any> {
    const url = this.baseURL + rout.Api.auth.signUp ;
    return this.HttpService.createPostRequest(url, data).pipe(map(user => {
      this.ls.set('Token', user.authorisation.token );
      return user;
    }));
  }

  getAuthTokenFromLocalStorage() {
    return this.ls.get('Token');
  }

  logOut(): void {
    this.ls.remove('Token');
      this.router.navigate([rout.movies.login]);
  }

}
