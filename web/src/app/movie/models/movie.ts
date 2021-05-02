export interface Genre {
  id: number,
  name: string
}


export interface Movie {
  id: number,
  title: string,
  original_title: string,
  popularity: number,
  genres?: Genre[],
  genre_ids?: number[],
  adult: boolean,
  imdb: string | null,
  overview: string,
  poster_path: string,
  release_date: string,
  runtime: number,
  status: string,
  vote_average: number,
  vote_count: 3439
}

export interface MoviesListResponse {
  page: number,
  results: Movie[],
}