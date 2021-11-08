import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');
  @Input() userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    BirthDate: this.user.BirthDate,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  editUser(): void {
    this.fetchApiData
      .editUser(this.user.Username, this.userData)
      .subscribe((res) => {
        this.dialogRef.close();
        localStorage.setItem('user', JSON.stringify(res)); //updating the localstorage with the updated user
        this.snackBar.open('The profile was successfully updated! 👏', 'Nice', {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  }
}
