import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData!: IUser;
  durationInSeconds = 5;

  constructor(private _router:Router, private _auth:AuthService, public dialog: MatDialog,private _snackBar: MatSnackBar) { 
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  loginUser(username, password){

    this.loginUserData.userName = username;
    this.loginUserData.password = password;

    console.log(username+" "+password);

    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {console.log(res)
        if(res.statusCode == 200){
        localStorage.setItem('token', res.data.token)
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          panelClass: 'green-dialog',
          data: {message: "Login Successfull"},
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        this._router.navigate(['/create'])
        });}
        else{
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            disableClose: true,
          panelClass: 'red-dialog',
            data: {message: "Username or Password doesn't exist or username or Password entered is wrong"},
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }

        // this._snackBar.open('Login Successfull  !!', 'Ok', {
        //   horizontalPosition: this.horizontalPosition,
        //   verticalPosition: this.verticalPosition,
        //   duration: this.durationInSeconds * 1000,
        //   panelClass: 'green-snackbar',
        // });
        // this._router.navigate(['/create'])
      },
      err => {console.log(err)}
    )
  }

}
