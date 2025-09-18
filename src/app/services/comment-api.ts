import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

interface CommentAddDTO {
  content: string;
  picture: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CommentApi {
  private httpClient = inject(HttpClient);

  getCommentsForPicture(pictureId: Signal<string>) {
    return httpResource<Comment[]>(
      () => {
        const id = pictureId();
        return environment.apiUrl + `/api/picture/${id}/comment`
      }
    )
  }

  addComment(comment: CommentAddDTO) {
    return this.httpClient.post<Comment>(environment.apiUrl + '/api/comment', comment);
  }
}
