import React, { useState } from 'react';
import '../utils/SearchBar.logic.js'; 

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    window.SearchBarLogic.handleChange(e, setQuery);
  };

  const handleSubmit = (e) => {
    window.SearchBarLogic.handleSubmit(e, query, onSearch);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="form-control me-2"
        placeholder="Buscar productos..."
      />
      <button type="submit" className="btn btn-outline-light">Buscar</button>
    </form>
  );
}
