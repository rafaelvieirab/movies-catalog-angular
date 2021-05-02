import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie, MoviesListResponse } from '../../models/movie';
import { MovieService } from '../../movie.service';
import { the_movie_database_api } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieId: number = 0;
  // @ts-nocheck 
  //@ts-ignore
  movie: Movie = {};
  recommendations: Movie[] = [];
  similar: Movie[] = [];
  rateMovie: (number | null) = null;
  isMyList: boolean = false;
  baseUrlImage: string = the_movie_database_api.baseUrlImage;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  toRateMovie() {}

  toggleAddMyList() {
    this.isMyList = !this.isMyList;
  }

  ngOnInit() {
    this.movieId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.movieService.getById(this.movieId).subscribe(response => {
      this.movie = response;
      this.movie.poster_path = `${this.baseUrlImage}/w400/${this.movie.poster_path}`;
    });
    
    this.movieService.getRecommendationsById(this.movieId).subscribe(response => {
      this.recommendations = this.mapMovies(response);
    });

    this.movieService.getSimilarById(this.movieId).subscribe(response => {
      this.similar = this.mapMovies(response);
    });
  }

  mapMovies(moviesResponse: MoviesListResponse): Movie[] {
    return moviesResponse.results.map((movie: Movie) => {
      return {
        ...movie,
        poster_path: `${this.baseUrlImage}/w200/${movie.poster_path}`
      };
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
