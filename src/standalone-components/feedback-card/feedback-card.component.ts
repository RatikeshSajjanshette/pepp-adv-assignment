import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from '../star/star.component';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [CommonModule, StarComponent],
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss'],
})
export class FeedbackCardComponent implements OnInit {
  @Input() feedbackData: any = {
    comment: '',
    rating: 0,
    date: '',
    starCount: 0,
  };
  constructor() {}

  ngOnInit(): void {}
}
