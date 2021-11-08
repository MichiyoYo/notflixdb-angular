import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss'],
})
export class ProfileDeleteComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  deregisterUser(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe(
      () => {
        this.snackBar.open(
          `The user ${this.user.Username} has been deregistered`,
          'Great',
          {
            duration: 2000,
          }
        );
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open(result, 'Ok', { duration: 2000 });
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }

  cancelDeregistration(): void {
    this.router.navigate(['/user']).then(() => {
      window.location.reload();
    });
  }
}
