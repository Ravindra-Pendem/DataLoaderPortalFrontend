import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { url_constants } from '../Constants/url_constants';
import { IStatus } from '../Interfaces/IStatus';
import { IUser } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }

  loginUser(user: IUser) : Observable<IStatus> {
    return this.http.post<any>(url_constants.LOGIN, user);
  }

  loggedIn() {
    return !!JSON.parse(sessionStorage.getItem('token'));
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken() {
    return JSON.parse(sessionStorage.getItem('token'));
  }

}
