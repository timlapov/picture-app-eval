import {Component, computed, inject, input, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PictureApi} from '../../services/picture-api';
import {CommentApi} from '../../services/comment-api';
import {AuthenticationApi} from '../../authentication/authentication-api';

@Component({
  selector: 'app-picture-details',
  imports: [DatePipe, FormsModule],
  templateUrl: './picture-details.html',
  styleUrl: './picture-details.css'
})
export class PictureDetails {
  protected readonly environment = environment;
  protected readonly pictureApi = inject(PictureApi);
  protected readonly commentApi = inject(CommentApi);
  protected readonly authApi = inject(AuthenticationApi);

  readonly id = input<string>('');
  readonly picture = this.pictureApi.getOnePicture(this.id);
  protected readonly comments = this.commentApi.getCommentsForPicture(this.id);

  protected readonly isLiking = signal(false);
  protected readonly isAddingComment = signal(false);
  protected readonly commentText = signal('');

  protected readonly currentUser = computed(() => this.authApi.user());

  protected readonly isLikedByCurrentUser = computed(() => {
    const user = this.currentUser();
    const picture = this.picture.value();

    if (!user || !picture) return false;

    return picture.likes.some(like => like.id === user.id);
  });

  toggleLike() {
    const pictureId = this.id();
    const currentUser = this.currentUser();

    if (!pictureId || !currentUser || this.isLiking()) {
      return;
    }

    this.isLiking.set(true);

    // First verify authentication with server before proceeding
    this.authApi.checkAuthStatus().subscribe({
      next: () => {
        this.proceedWithLike(pictureId);
      },
      error: () => {
        this.isLiking.set(false);
        // Clear invalid session data
        localStorage.removeItem('user');
        this.authApi.user.set(null);
      }
    });
  }

  private proceedWithLike(pictureId: string) {
    this.pictureApi.toggleLike(pictureId).subscribe({
      next: () => {
        // Update the picture resource with the new data
        this.picture.reload();
        this.isLiking.set(false);
      },
      error: () => {
        this.isLiking.set(false);
      }
    });
  }

  addComment() {
    const pictureId = this.id();
    const currentUser = this.currentUser();
    const content = this.commentText().trim();

    if (!pictureId || !currentUser || !content || this.isAddingComment()) {
      return;
    }

    this.isAddingComment.set(true);

    // First verify authentication with server before proceeding
    this.authApi.checkAuthStatus().subscribe({
      next: () => {
        this.proceedWithComment(pictureId, content);
      },
      error: () => {
        this.isAddingComment.set(false);
        // Clear invalid session data
        localStorage.removeItem('user');
        this.authApi.user.set(null);
      }
    });
  }

  private proceedWithComment(pictureId: string, content: string) {
    const commentData = {
      content,
      picture: {
        id: parseInt(pictureId, 10)
      }
    };

    this.commentApi.addComment(commentData).subscribe({
      next: () => {
        // Clear the input and reload comments
        this.commentText.set('');
        this.comments.reload();
        this.isAddingComment.set(false);
      },
      error: () => {
        this.isAddingComment.set(false);
      }
    });
  }

}
