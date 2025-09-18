import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {tap} from 'rxjs';

interface UserRegistrationDTO {
  email: string;
  displayName: string;
  password: string;
}

interface UserResponseDTO {
  id: number;
  email: string;
  displayName: string;
  role: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApi {
  private httpClient = inject(HttpClient);
  user = signal<UserResponseDTO | null>(null);

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user.set(JSON.parse(userStr));
    }
  }

  register(userRegistrationDTO: UserRegistrationDTO) {
    return this.httpClient.post(environment.apiUrl + '/api/user', userRegistrationDTO);
  }

  login(credentials: {email:string,password:string}) {
    return this.httpClient.get<UserResponseDTO>(environment.apiUrl + '/api/account', {
      headers: {
        'Authorization': 'Basic ' + btoa(credentials.email + ':' + credentials.password)
      },
      withCredentials: true
    }).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.user.set(response);
      })
    );
  }

  logout() {
    return this.httpClient.post(environment.apiUrl + '/api/logout', {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.user.set(null);
      })
    );
  }

  checkAuthStatus() {
    return this.httpClient.get<UserResponseDTO>(environment.apiUrl + '/api/account', {
      withCredentials: true
    });
  }

}
