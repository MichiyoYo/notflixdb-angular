/**
 * Welcome page view allows a user to login or register
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * All constructor items are documented as properties
   * @ignore
   * @param dialog the dialog that opens
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Initializes the commponent
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * Opens a user registration dialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens a user login dialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px',
    });
  }
}
