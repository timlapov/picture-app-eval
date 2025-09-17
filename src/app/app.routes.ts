import { Routes } from '@angular/router';
import {HomePage} from './components/home-page/home-page';
import {PictureDetails} from './components/picture-details/picture-details';

export const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'picture/:id', component: PictureDetails},
  {path: 'author/:authorId', component: HomePage},
];
