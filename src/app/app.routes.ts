import { Routes } from '@angular/router';
import {HomePage} from './components/home-page/home-page';
import {PictureDetails} from './components/picture-details/picture-details';
import {RegisterPage} from './components/register-page/register-page';
import {LoginPage} from './components/login-page/login-page';
import {AddPicture} from './components/add-picture/add-picture';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'picture/:id', component: PictureDetails},
  {path: 'author/:authorId', component: HomePage},
  {path: 'register', component: RegisterPage},
  {path: 'login', component: LoginPage},
  {path: 'add-picture', component: AddPicture, canActivate: [authGuard]},
];
