import { Routes } from '@angular/router';
import { notFoundComponent } from './notFound/notFound.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './catalog/details/details.component';
import { AddComponent } from './catalog/create/create.component';
import { EditComponent } from './catalog/edit/edit.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchComponent } from './catalog/search/search.component';
import { guestGuard } from './guards/guest.guard';
import { ErrorMessageComponent } from './error-message/error-message.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},

  {path: 'search',
    children: [
      {path: '', loadComponent: () =>import('./catalog/search/search.component').then((component) => component.SearchComponent),},
      {path: 'catalog/:productId', loadComponent: () =>import('./catalog/details/details.component').then((component) => component.DetailsComponent),},
    ],
  },
  {path: 'catalog',
    children: [
      {path: '', loadComponent: () => import('./main/main.component').then((component) => component.MainComponent),},
      {path: ':productId', loadComponent: () =>import('./catalog/details/details.component').then((component) => component.DetailsComponent),},
    ],
  },
  {path: 'edit/:productId', canActivate: [AuthGuard], loadComponent: () => import('./catalog/edit/edit.component').then(component => component.EditComponent)},
  {path: 'delete/:productId', canActivate: [AuthGuard], loadComponent: () => import('./catalog/delete/delete.component').then(component => component.DeleteComponent)},

  {path: 'create', loadComponent: () => import('./catalog/create/create.component').then((component) => component.AddComponent), canActivate: [AuthGuard]},

  {path: 'login', canActivate: [guestGuard], component: LoginComponent},
  {path: 'profile', loadComponent: () => import('./user/profile/profile.component').then(component => component.ProfileComponent)},
  {path: 'register', canActivate: [guestGuard],component: RegisterComponent},
  
  {path: 'error', component: ErrorMessageComponent},
  { path: '404', component: notFoundComponent },
  { path: '**', redirectTo: '/404' },
];
