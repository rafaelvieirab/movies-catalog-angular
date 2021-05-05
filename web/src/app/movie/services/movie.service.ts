import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Genre, Movie, MoviesListResponse } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Movie> {
    const url = `/movie/${id}`;
    return this.http.get<Movie>(url);
  }

  getLatest(): Observable<Movie> {
    const url = '/movie/latest';
    return this.http.get<Movie>(url);
  }

  getBySearch(query: string): Observable<MoviesListResponse> {
    const url = `/search/movie?query=${query}`;
    return this.http.get<MoviesListResponse>(url);
  }

  getMoviesGenres(): Observable<Genre[]>  {
    const url = 'genre/movie/list';
    return this.http.get<Genre[]>(url);
  }

  getRecommendationsById(id: number): Observable<MoviesListResponse> {
    const url = `movie/${id}/recommendations`;
    return this.http.get<MoviesListResponse>(url);
  }

  getSimilarById(id: number): Observable<MoviesListResponse> {
    const url = `movie/${id}/similar`;
    return this.http.get<MoviesListResponse>(url);
  }

  getPopular(): Observable<MoviesListResponse> {
    const url = '/movie/popular';
    return this.http.get<MoviesListResponse>(url);
  }

  getMoviesUpcoming(): Observable<MoviesListResponse> {
    const url = '/movie/upcoming';
    return this.http.get<MoviesListResponse>(url);
  }

  getMoviesNowPlaying(): Observable<MoviesListResponse> {
    const url = '/movie/now_playing';
    return this.http.get<MoviesListResponse>(url);
  }

  getMoviesTopRated(): Observable<MoviesListResponse> {
    const url = '/movie/top_rated';
    return this.http.get<MoviesListResponse>(url);
  }
}
