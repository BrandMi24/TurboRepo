import { createContext, useContext, useState, useCallback } from 'react';
import type { MovieDetail, MovieSummary } from '../services/omdb';
import { searchMovies, getMovieById } from '../services/omdb';

type Status = 'idle' | 'loading' | 'error';

interface MoviesContextValue {
  query: string;
  setQuery: (q: string) => void;
  movies: MovieSummary[];
  total: number;
  page: number;
  status: Status;
  errorMsg: string;
  selected: MovieDetail | null;
  setSelected: (m: MovieDetail | null) => void;
  doSearch: (q: string, p?: number) => Promise<void>;
  selectMovie: (id: string) => Promise<void>;
}

const MoviesContext = createContext<MoviesContextValue | null>(null);

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('batman');
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selected, setSelected] = useState<MovieDetail | null>(null);

  const ITEMS_PER_PAGE = 9;

  const doSearch = useCallback(async (newQuery: string, newPage: number = 1) => {
    try {
      setStatus('loading'); setErrorMsg('');

      // Mapeo de nuestra página (de 9 en 9) a páginas OMDb (de 10 en 10)
      const omdbPage = Math.floor(((newPage - 1) * ITEMS_PER_PAGE) / 10) + 1; // 1-based
      const startIndexInBatch = ((newPage - 1) * ITEMS_PER_PAGE) - ((omdbPage - 1) * 10);

      // Pedimos 1–2 páginas de OMDb para cubrir los 9 items
      const [p1, p2] = await Promise.all([
        searchMovies(newQuery, omdbPage),
        searchMovies(newQuery, omdbPage + 1),
      ]);

      const merged = [...(p1.Search ?? []), ...(p2.Search ?? [])];
      const pageItems = merged.slice(startIndexInBatch, startIndexInBatch + ITEMS_PER_PAGE);

      setMovies(pageItems);
      // Guardamos el total real que reporta OMDb (número de resultados)
      const totalResults = Number((p1.totalResults ?? p2.totalResults ?? 0));
      setTotal(totalResults);
      setPage(newPage);
      setQuery(newQuery);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error'); setErrorMsg(e.message ?? 'Error');
    }
  }, []);

  const selectMovie = useCallback(async (imdbID: string) => {
    try {
      setStatus('loading'); setErrorMsg('');
      const detail = await getMovieById(imdbID);
      setSelected(detail);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error'); setErrorMsg(e.message ?? 'Error');
    }
  }, []);

  const value: MoviesContextValue = {
    query, setQuery,
    movies, total, page,
    status, errorMsg,
    selected, setSelected,
    doSearch, selectMovie
  };

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}

export const useMovies = () => {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error('useMovies must be used within MoviesProvider');
  return ctx;
};
