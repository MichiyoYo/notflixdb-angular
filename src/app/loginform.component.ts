import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: ` Username: <input type="text" [(ngModel)="userName" ] /> `,
})
export class LoginComponent {
  userName = '';
}
