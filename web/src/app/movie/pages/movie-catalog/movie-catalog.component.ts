import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { the_movie_database_api } from 'src/environments/environment';
import { Movie, Genre } from '../../models/movie';
import { MovieService } from '../../movie.service';
import { mapMovies } from 'src/utils/mapMovies';

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
export class MovieCatalogComponent implements OnInit {
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
  genres: Genre[] = [];
  //@ts-ignore
  featuredMovie: (Movie | undefined) = undefined;
  searchMovie: FormControl = new FormControl();
  filteredMovies: Movie[] = [];
  filtrationType: string = '';
  showFilter: boolean = false;
  baseUrlImage: string = the_movie_database_api.baseUrlImage;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMoviesGenres().subscribe(response => {
      this.genres = response;
    });

    this.movieService.getMoviesNowPlaying().subscribe(response => {
      this.movies.nowPlaying.movies = mapMovies(response);
    });

    this.movieService.getMoviesUpcoming().subscribe(response => {
      this.movies.upcoming.movies = mapMovies(response);
    });

    this.movieService.getPopular().subscribe(response => {
      this.movies.popular.movies = mapMovies(response);
    });

    this.movieService.getMoviesTopRated().subscribe(response => {
      this.movies.topRated.movies = mapMovies(response);
      this.setFeatureMovie();
    });
  }

  getMoviesBySearch() {
    if(this.searchMovie.value) {
      this.movieService.getBySearch(this.searchMovie.value).subscribe(response => {
        // this.filteredMovies = (response | mapMovies:200) ;
        this.filteredMovies = mapMovies(response) ;
      })
    }
  }

  getGenresOfFeatureMovie() {

  }

  setFeatureMovie() {
    const randomMovieId = this.movies.topRated.movies[0].id;
    this.movieService.getById(randomMovieId).subscribe(response => {
      this.featuredMovie = response;
      this.featuredMovie.poster_path = `${this.baseUrlImage}/w200/${this.featuredMovie.poster_path}`;

    });
  }

}
