import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { IFeedback } from 'src/data-models/feedback-data.model';
import { ILogin } from 'src/data-models/login-data-model';
import { feedback } from 'src/data/mock-data';
import { USER_CREDS } from 'src/user-data/user-cred';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  feedbackData!: IFeedback[] | any;
  private feedbacks = new BehaviorSubject<any>(this.feedbackData);
  feedbackData$ = this.feedbacks.asObservable();
  constructor(private _matSnackBar: MatSnackBar) {}

  /**
   * @description: If email and password is available it will return true else false
   * @param loginFormValues: ILogin
   * @returns boolean
   */
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

  /**
   * @description: This will open the snackbar
   * @param message: string
   * @param action: string
   */
  showSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  /**
   * @description : To get data of feedbacks for home page
   */
  getFeedbackData(): void {
    this.feedbackData = feedback?.feedbacks;
    this.feedbacks.next(this.feedbackData);
  }

  /**
   * @description : Get comment from feedback form;
   * @param ratingForm :{ratingComment : string}
   * @returns : string
   */
  getComment(ratingForm: { ratingComment: string }): string {
    return ratingForm?.ratingComment;
  }

  /**
   * @description : To add new object to feedbackData array
   * @param newFeedback : Feedback
   */
  saveFeedbackData(newFeedback: IFeedback): void {
    this.feedbackData?.push(newFeedback);
    this.feedbacks.next(this.feedbackData);
  }
}
