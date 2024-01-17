import { DiscoverResult, FilmType, Genre } from "./definitions";

const TMDB_URL = "https://api.themoviedb.org/3";

export async function fetchGenres(type: string): Promise<Array<Genre>> {
  const genreURL = `${TMDB_URL}/genre/${type}/list`;
  const data = await fetchFromTMDB(genreURL);

  return data.genres;
}

export async function fetchRecommendedFilms(
  type: FilmType,
  genres: string,
  rating: string,
  page: string = "1"
) {
  const url = `${TMDB_URL}/discover/${type}?include_adult=true&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=${rating}&with_genres=${genres}`;
  const data = await fetchFromTMDB(url);
  const result: DiscoverResult = {
    page: data.page,
    results: data.results.map((res: any) => ({
      posterPath: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
      title: res.title || res.name,
      overview: res.overview,
      voteAverage: res.vote_average,
      releaseDate: res.release_date || res.first_air_date,
    })),
    totalPages: data.total_pages,
  };

  return result;
}

async function fetchFromTMDB(url: URL | RequestInfo, options?: RequestInit) {
  let headers = {
    accept: "application/json",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGMxNTRjNWNhYzBlMzg2NTAyN2M1MzI2ODM2NTg5NCIsInN1YiI6IjY1ODRmMWZmNGYzM2FkNWNjNjAxYzhhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jPTIZIBJWtfji-lfHxKRs0s_4-ejo_EpLKlLqfoeamc",
  };

  let otherOptions;

  if (options) {
    const { headers: optionHeaders, ...restOptions } = options;
    headers = { ...headers, ...optionHeaders };
    otherOptions = restOptions;
  }

  const res = await fetch(url, {
    headers,
    ...otherOptions,
  });

  return res.json();
}
