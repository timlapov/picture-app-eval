import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

interface UserRegistrationDTO {
  email: string;
  displayName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApi {
  private httpClient = inject(HttpClient);

  register(userRegistrationDTO: UserRegistrationDTO) {
    return this.httpClient.post(environment.apiUrl + '/api/user', userRegistrationDTO);
  }

}
