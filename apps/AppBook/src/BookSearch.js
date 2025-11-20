// API DE OPEN LIBRARY SEARCH API

import React, { useState } from "react";
import "./BookSearch.css";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);


  const searchBooks = async () => {
    if (!query) return;
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();
    setBooks(data.docs.slice(0, 100));
  };

  return (
    <div className="book-search-container">
      <h1>BookSearch</h1>
 
      <div className="search-bar">
        <input
          type="text"
          placeholder="Escribe un título o autor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Buscar</button>
      </div>

      <div className="books-list">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <p>Sin portada</p>
            )}

            <h2>{book.title}</h2>
            <p>
              <strong>Autor:</strong>{" "}
              {book.author_name ? book.author_name.join(", ") : "Desconocido"}
            </p>
            <p>
              <strong>Año:</strong>{" "}
              {book.first_publish_year || "No disponible"}
            </p>
            <p>
              <strong>Ediciones:</strong>{" "}
              {book.edition_count || "No disponible"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
