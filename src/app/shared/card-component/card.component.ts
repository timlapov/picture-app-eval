import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-card-component',
  imports: [DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  readonly title = input<string>();
  readonly image = input<string>();
  readonly link = input<string>();
  readonly authorName = input<string>();
  readonly authorLink = input<string>();
  readonly date = input<string | Date>();
  readonly likes = input<number>(0);
}
