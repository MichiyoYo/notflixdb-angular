import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (result) => {
        this.dialogRef.close();

        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.dialogRef.close();
        this.snackBar.open('Successfully logged in! 😸', 'OK, cool', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(
          'Wrong username or password. Please try again. 😿',
          'Aw, alright',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
