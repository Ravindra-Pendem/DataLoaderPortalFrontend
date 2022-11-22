import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData!: IUser;

  constructor(private _router:Router, private _auth:AuthService) { 
    if(this.loginUserData == undefined){
      this.loginUserData = {
        userName: "",
        password: ""
      };
    }
  }

  ngOnInit(): void {
  }

  register(){
    console.log("Register works");
  }

  loginUser(username, password){

    this.loginUserData.userName = username;
    this.loginUserData.password = password;

    console.log(username+" "+password);
    // this.loginUser()
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {console.log(res)
        // localStorage.setItem('token', res.token)
        this._router.navigate(['/create'])
      },
      err => console.log(err)
    )
    // this._router.navigate(['/create']);
  }

}
