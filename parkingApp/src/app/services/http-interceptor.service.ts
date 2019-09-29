import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private headers: object = {
    'Content-Type': 'application/json',
  };

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');
    if (this.loginService.token) {
      req = req.clone({ headers: req.headers.set('x-token', this.loginService.token) });
    }
    Object.keys(this.headers).forEach(e => {
      req = req.clone({ headers: req.headers.set(e, this.headers[e]) });
    });
    console.log(req);

    return next.handle(req);
  }
}
