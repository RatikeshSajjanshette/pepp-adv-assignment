import { Injectable } from '@angular/core';
import { ILogin } from 'src/data-models/login-data-model';
import { USER_CREDS } from 'src/user-data/user-cred';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

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
}
