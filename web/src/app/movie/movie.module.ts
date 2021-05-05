import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AddBaseUrlImagePipe } from './pipes/add-base-url-image.pipe';
import { AddApiDataInterceptor } from './interceptors/add-api-data.interceptor';
import { MovieRoutingModule } from './movie-routing.module';

import { MovieComponent } from './pages/movie.component';
import { MovieCatalogComponent } from './pages/movie-catalog/movie-catalog.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieSlideComponent } from './components/movie-slide/movie-slide.component';
import { FetchMovieComponent } from './components/fetch-movie/fetch-movie.component';
import { FeaturedMovieComponent } from './components/featured-movie/featured-movie.component';

import { MovieService } from './services/movie.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MovieComponent,
    MovieCatalogComponent,
    MovieDetailsComponent,
    MovieSlideComponent,
    FetchMovieComponent,
    FeaturedMovieComponent,
    AddBaseUrlImagePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    MovieRoutingModule,
    HttpClientModule,
  ],
  providers: [
    MovieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddApiDataInterceptor,
      multi: true,
    }
  ]
})
export class MovieModule { }
