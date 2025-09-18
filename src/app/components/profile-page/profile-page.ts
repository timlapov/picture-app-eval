import {Component, inject} from '@angular/core';
import {AuthenticationApi} from '../../authentication/authentication-api';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage {
  protected readonly authApi = inject(AuthenticationApi);

    protected readonly currentUser = this.authApi.user();

}
