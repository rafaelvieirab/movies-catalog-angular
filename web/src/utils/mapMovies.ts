
import { Movie, MoviesListResponse } from '../app/movie/models/movie';
import { the_movie_database_api } from '../environments/environment';

const baseUrlImage = the_movie_database_api.baseUrlImage;

export function mapMovies(moviesResponse: MoviesListResponse): Movie[] {
  return moviesResponse.results.map((movie: Movie) => {
    return {
      ...movie,
      poster_path: `${baseUrlImage}/w200/${movie.poster_path}`
    };
  });
}