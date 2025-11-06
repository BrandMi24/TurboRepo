import { useState } from 'react';
import { useMovies } from '../context/MoviesContext';
import { Search } from 'lucide-react'; // ícono moderno (instálalo con: npm i lucide-react)

export default function MovieSearch() {
  const { query, doSearch } = useMovies();
  const [text, setText] = useState<string>(query);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = text.trim();
    if (q) doSearch(q, 1);
  };

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <Search className="search-icon" size={18} />
      <input
        placeholder="Buscar película o serie..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="search-btn">Buscar</button>
    </form>
  );
}
