import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _router: Router, private _auth: AuthService, public dialog: MatDialog, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  ngOnInit(): void {
  }

  register() {
    console.log("Register works");
  }

  loginUser() {

    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._auth.loginUser(this.loginForm.value)
        .subscribe(
          res => {
            console.log(res)
            if (res.statusCode == 200) {
              const dialogRef = this.dialog.open(AlertDialogComponent, {
                disableClose: true,
                panelClass: 'green-dialog',
                data: { message: "Login Successfull" },
              });
              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
                sessionStorage.setItem('token', JSON.stringify(res.data.token));
                this._router.navigate(['/create'])
              });
            }
            else {
              const dialogRef = this.dialog.open(AlertDialogComponent, {
                disableClose: true,
                panelClass: 'red-dialog',
                data: { message: "Username or Password doesn't exist or username or Password entered is wrong" },
              });
              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
              });
            }
          },
          err => { console.log(err) }
        )
    }
    else {
      this.loginForm.markAllAsTouched();
      return;
    }
  }

}
