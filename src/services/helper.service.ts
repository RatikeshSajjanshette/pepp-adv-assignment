import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILogin } from 'src/data-models/login-data-model';
import { USER_CREDS } from 'src/user-data/user-cred';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private _matSnackBar: MatSnackBar) {}

  validateUser(loginFormValues: ILogin) {
    if (
      loginFormValues.email === USER_CREDS.email &&
      loginFormValues.password === USER_CREDS.password
    ) {
      sessionStorage.setItem('email', loginFormValues.email);
      sessionStorage.setItem('password', loginFormValues.password);
      return true;
    }
    return false;
  }

  showSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
