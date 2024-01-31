import { DiscoverResult, FilmType, Genre, Person } from "./definitions";

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

export async function fetchActors(searchTerm: string): Promise<Person[]> {
  const url = `${TMDB_URL}/search/person?query=${searchTerm}&include_adult=true&page=1`;
  const data = await fetchFromTMDB(url);
  const people: Person[] = data.results
    .sort((a: any, b: any) => b.popularity - a.popularity)
    .map((res: any) => ({
      id: res.id,
      name: res.name,
      popularity: res.popularity,
      profileImageUrl: `https://image.tmdb.org/t/p/w500${res.profile_path}`,
    }));

  return people.slice(0, 50);
}

async function fetchFromTMDB(url: URL | RequestInfo, options?: RequestInit) {
  let headers = {
    accept: "application/json",
    authorization: `Bearer ${process.env.TMDB_TOKEN}`,
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
