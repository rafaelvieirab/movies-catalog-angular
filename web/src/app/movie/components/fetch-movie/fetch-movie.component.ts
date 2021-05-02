import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Movie } from '../../models/movie';
import { MovieService } from '../../movie.service';
import { mapMovies } from 'src/utils/mapMovies';

@Component({
  selector: 'app-fetch-movie',
  templateUrl: './fetch-movie.component.html',
  styleUrls: ['./fetch-movie.component.scss']
})
export class FetchMovieComponent implements OnInit {
  movies = {
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
  //@ts-ignore
  featuredMovie: (Movie | undefined) = undefined;
  searchMovie: FormControl = new FormControl();
  filteredMovies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  getMoviesBySearch() {
    if(this.searchMovie.value) {
      this.movieService.getBySearch(this.searchMovie.value).subscribe(response => {
        this.filteredMovies = mapMovies(response);
      })
    } else {
      this.filteredMovies = [];
    }
  }

}

