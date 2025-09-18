import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

interface PictureAddDTO {
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PictureApi {

  private httpClient = inject(HttpClient);

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

  upload(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<{filename: string}>(environment.apiUrl + `/api/picture/upload`, formData);
  }

  addPicture(picture: PictureAddDTO) {
    return this.httpClient.post<Picture>(environment.apiUrl + `/api/picture`, picture);
  }

  toggleLike(pictureId: string) {
    return this.httpClient.patch<Picture>(environment.apiUrl + `/api/picture/${pictureId}/like`, {});
  }

}
