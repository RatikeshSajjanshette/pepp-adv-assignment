import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() showSideBarEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  showSideNav() {
    this.showSideBarEvent.emit();
  }
}
