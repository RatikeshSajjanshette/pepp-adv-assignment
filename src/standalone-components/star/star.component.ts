import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {
  @Input() starRating: number | any = 0;
  @Input() starCount: number | any = 5;
  @Output() ratingUpdated = new EventEmitter();

  ratingArr: Array<number> = [];
  constructor() {}

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  /**
   * @description: This will emit the event
   * @param rating : number
   * @returns : boolean
   */
  onClick(rating: number): boolean {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number): string {
    if (this.starRating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
