import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PictureApi {
  getPageOfPictures(page: Signal<number | undefined>) {
    return httpResource<Page<Picture>>(
      () => {
        const pageNumber = page() ?? 1;
        return environment.apiUrl + `/api/picture?pageNumber=${pageNumber - 1}`;
      }
    );
  }

  getOnePicture(id: Signal<string>) {
    return httpResource<Picture>(() => {
      const value = id();
      return environment.apiUrl + `/api/picture/${value}`;
    });
  }

  getPageOfPicturesByAuthor(authorId: Signal<string>, page: Signal<number | undefined>) {
    return httpResource<Page<Picture>>(
      () => {
        const pageNumber = page() ?? 1;
        return environment.apiUrl + `/api/picture/user/${authorId()}?pageNumber=${pageNumber - 1}`;
      }
    );
  }
}
