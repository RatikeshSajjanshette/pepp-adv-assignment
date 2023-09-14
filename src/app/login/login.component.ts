import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * @description: This will return email form control
   */
  get email(): UntypedFormControl {
    return this.loginForm.get('email') as UntypedFormControl;
  }

  /**
   * @description: This will return password form control
   */
  get password(): UntypedFormControl {
    return this.loginForm.get('password') as UntypedFormControl;
  }

  /**
   * @description: If user is valid then it will navigate to home else it will show error message
   */
  signIn() {
    if (this.loginForm.valid) {
      if (this._helperService.validateUser(this.loginForm.value)) {
        this._router.navigateByUrl('home');
      } else {
        this._helperService.showSnackBar(
          'Email or password is invalid',
          'close'
        );
      }
    } else {
      this._helperService.showSnackBar('Email or password is invalid', 'close');
    }
  }
}
