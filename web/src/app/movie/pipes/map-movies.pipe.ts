import { Pipe, PipeTransform } from '@angular/core';

import { the_movie_database_api } from 'src/environments/environment';
import { Movie, MoviesListResponse } from '../models/movie';

@Pipe({
  name: 'mapMovies'
})
export class MapMoviesPipe implements PipeTransform {
  baseUrlImage: string = the_movie_database_api.baseUrlImage;

  transform(value:MoviesListResponse, width:number = 200): Movie[] {
    return value.results.map((movie: Movie) => {
      return {
        ...movie,
        poster_path: `${this.baseUrlImage}/w${width}/${movie.poster_path}`
      };
    });
  }

}
