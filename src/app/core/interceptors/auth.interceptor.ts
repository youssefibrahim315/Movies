import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { baseURL } from '../config/routes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  baseURL = baseURL
  constructor(
      private AuthService: AuthService
   ){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let header:any = {};

    let token = this.AuthService.getAuthTokenFromLocalStorage();
    if(token){      
        header['Authorization'] = `Bearer ${token}`;
        const headers = new HttpHeaders(header);
        request = request.clone({ headers });
    }
    return next.handle(request);
}
}



