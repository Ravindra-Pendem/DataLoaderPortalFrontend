import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "http://localhost:8085/account/login";

  constructor(private http: HttpClient, private _router: Router) { }

  loginUser(user: IUser){
    return this.http.post<any>(this._loginUrl, user);
  }


}
