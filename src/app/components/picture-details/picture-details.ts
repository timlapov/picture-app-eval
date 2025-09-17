import {Component, inject, input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DatePipe} from '@angular/common';
import {PictureApi} from '../../services/picture-api';
import {CommentApi} from '../../services/comment-api';

@Component({
  selector: 'app-picture-details',
  imports: [DatePipe],
  templateUrl: './picture-details.html',
  styleUrl: './picture-details.css'
})
export class PictureDetails {
  protected readonly environment = environment;
  protected readonly pictureApi = inject(PictureApi);
  protected readonly commentApi = inject(CommentApi);

  readonly id = input<string>('');
  readonly picture = this.pictureApi.getOnePicture(this.id);
  protected readonly comments = this.commentApi.getCommentsForPicture(this.id);

  toggleLike() {
    // TODO: Implement like functionality
    console.log('Like clicked');
  }

}
