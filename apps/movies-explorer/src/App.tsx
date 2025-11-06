import Header from './components/Header';
import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { MoviesProvider, useMovies } from './context/MoviesContext';
import './styles/app.css';
import { useEffect } from 'react';

function InitialSearch() {
  const { doSearch } = useMovies();
  useEffect(() => { doSearch('batman', 1); }, []);
  return null;
}

export default function App() {
  return (
    <MoviesProvider>
      <div className="container">
        <Header />
        <MovieSearch />
        <main className="grid">
          <section className="results-col">
            <MovieList />
          </section>
          <aside className="details-col">
            <MovieDetails />
          </aside>
        </main>
        <InitialSearch />
      </div>
    </MoviesProvider>
  );
}
