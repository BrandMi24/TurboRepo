export interface MovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search?: MovieSummary[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface MovieDetail extends MovieSummary {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: { Source: string; Value: string }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;
const BASE = 'https://www.omdbapi.com/';

export async function searchMovies(query: string, page = 1): Promise<SearchResponse> {
  const url = `${BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

export async function getMovieById(imdbID: string): Promise<MovieDetail> {
  const url = `${BASE}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = (await res.json()) as MovieDetail & { Response: string; Error?: string };
  if ((data as any).Response === 'False') throw new Error((data as any).Error || 'Movie not found');
  return data;
}
