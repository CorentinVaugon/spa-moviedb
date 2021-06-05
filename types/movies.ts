export interface GenreCollection {
  id: number,
  name: string
}

export interface MoviesCollection {
  title: string,
  voteAverage: number,
  releaseDate: string,
  genres: Array<number>,
  posterPath: string
}