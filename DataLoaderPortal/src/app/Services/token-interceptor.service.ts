import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req:any, next:any){
    let authService = this.injector.get(AuthService);
    let tokenizedReq;
    if(authService.getToken()){
     tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
  }
  else{
     tokenizedReq = req.clone({
      setHeaders: {
      }
    })
  }
    return next.handle(tokenizedReq);
  }

}
