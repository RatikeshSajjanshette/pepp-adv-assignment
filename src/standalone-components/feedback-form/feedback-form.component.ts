import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/services/helper.service';
import { IFeedback } from 'src/data-models/feedback-data.model';
import { HeaderComponent } from '../header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StarComponent } from '../star/star.component';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatSidenavModule,
    ReactiveFormsModule,
    StarComponent,
  ],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  providers: [DatePipe],
})
export class FeedbackFormComponent implements OnInit {
  ratingForm: FormGroup = new FormGroup({
    ratingComment: new FormControl(),
  });
  starRating: number = 0;
  starCount: number = 5;
  constructor(
    private _router: Router,
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _helperService: HelperService
  ) {}

  ngOnInit(): void {
    this._helperService.getFeedbackData();
    this.ratingForm = this._formBuilder?.group({
      ratingComment: ['', Validators.required],
    });
  }

  /**
   * @Description : To change the rating of feedback
   * @param rating
   */
  onRatingChanged(rating: any) {
    this.starRating = rating;
  }

  /**
   * @description : To submit the feedback which was received
   */
  onSubmit(): void {
    const currentDate = new Date();
    const formattedDate = this._datePipe.transform(currentDate, 'dd/MM/yyyy');
    if (this.ratingForm?.valid && this.starRating > 0) {
      const comment = this.ratingForm.value;
      const newFeedback: IFeedback = {
        comment: this._helperService.getComment(this.ratingForm?.value),
        starCount: 5,
        rating: this.starRating,
        date: formattedDate,
      };
      this._helperService.saveFeedbackData(newFeedback);
      this._helperService.showSnackBar('Feedback Added successfully!', 'Close');
      this.navigateToHomePage();
    } else {
      this._helperService.showSnackBar(
        'Please Add feedback and rating to submit the feedback',
        'Close'
      );
    }
  }

  /**
   * @description : To navigate back to home page
   */
  navigateToHomePage(): void {
    this._router.navigateByUrl('/home');
  }
}
