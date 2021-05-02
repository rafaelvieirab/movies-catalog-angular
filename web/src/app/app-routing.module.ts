import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './movie/pages/dashboard/dashboard.component';
import { MovieCatalogComponent } from './movie/pages/movie-catalog/movie-catalog.component';
import { MovieDetailsComponent } from './movie/pages/movie-details/movie-details.component';

import { LoginComponent } from './user/pages/login/login.component';
import { SignupComponent } from './user/pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MovieCatalogComponent,
      }, {
        path: 'movies/:id',
        component: MovieDetailsComponent,
      }
    ],
  }, {
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'sigup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
