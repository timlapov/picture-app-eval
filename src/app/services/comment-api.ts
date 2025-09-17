import {Injectable, Signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentApi {
  getCommentsForPicture(pictureId: Signal<string>) {
    return httpResource<Comment[]>(
      () => {
        const id = pictureId();
        return environment.apiUrl + `/api/picture/${id}/comment`
      }
    )
  }
}
