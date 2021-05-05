import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie, Genre } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

interface MovieDashboard {
  upcoming: {
    text: string,
    movies: Movie[]
  },
  nowPlaying: {
    text: string,
    movies: Movie[]
  },
  popular: {
    text: string,
    movies: Movie[]
  },
  topRated: {
    text: string,
    movies: Movie[]
  },
}

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.scss']
})
export class MovieCatalogComponent implements OnInit, OnDestroy {
  
  genres: Genre[] = [];
  movies: MovieDashboard = {
    upcoming: {
      text: 'Próximos Filmes no Cinema',
      movies: []
    }, 
    nowPlaying: {
      text: 'Continuar Assistindo',
      movies: []
    },
    popular: {
      text: 'Populares',
      movies: []
    },
    topRated: {
      text: 'Melhores Avaliados',
      movies: []
    },
  };

  private subscriptions: Subscription[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.movieService.getMoviesGenres().subscribe(response => {
      this.genres = response;
    }));
    
    this.subscriptions.push(this.movieService.getMoviesNowPlaying().subscribe(response => {
      this.movies.nowPlaying.movies = response.results;
    }));

    this.subscriptions.push(this.movieService.getMoviesUpcoming().subscribe(response => {
      this.movies.upcoming.movies = response.results;
    }));

    this.subscriptions.push(this.movieService.getPopular().subscribe(response => {
      this.movies.popular.movies = response.results;
    }));

    this.subscriptions.push(this.movieService.getMoviesTopRated().subscribe(response => {
      this.movies.topRated.movies = response.results;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
