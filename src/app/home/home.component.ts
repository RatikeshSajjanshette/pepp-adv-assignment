import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFeedback } from 'src/data-models/feedback-data.model';
import { HelperService } from 'src/services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  feedbackCollection!: IFeedback[];
  constructor(private _helperService: HelperService, private _router: Router) {}

  ngOnInit(): void {
    this._helperService.getFeedbackData();
    this.getFeedbackData();
  }

  /**
   * @Description : To get feedback data from mock file
   */
  getFeedbackData(): void {
    this._helperService.feedbackData$.subscribe((feedbackData: IFeedback[]) => {
      if (feedbackData) {
        this.feedbackCollection = feedbackData;
      }
    });
  }

  /**
   * @description: This will navigate to the feedback form page
   */
  navigateToAddNewFeedbackForm() {
    this._router.navigateByUrl('/feedback-form');
  }
}
