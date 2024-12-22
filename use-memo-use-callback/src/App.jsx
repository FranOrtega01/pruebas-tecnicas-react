import { useState, useCallback } from 'react'
import './App.css'
import { MoviesContainer } from './components/Movies'
import { useMovies } from './customHooks/useSearch'
import { useSearch } from './customHooks/useSearch'
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading, searchError } = useMovies(search, sort)

  const debouncedGetMovies = useCallback(debounce((search) => {
    getMovies(search);
  }, 500), [])

const handleSubmit = e => {
  e.preventDefault();
  if (search === '') return;
  getMovies(search)
}

const handleChange = e => {
  const newSearch = e.target.value
  setSearch(newSearch);
  debouncedGetMovies(newSearch);
}

const handleSort = () => {
  setSort(!sort)
}

return (
  <div className='page'>
    <header>
      <h1>Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input name='query' value={search} onChange={handleChange} placeholder='Avengers, Star Wars...' type="text" />
        <input type="checkbox" name="check" onChange={handleSort} checked={sort} />
        <button type='submit'>Search</button>
        {error && <p>{error}</p>}
      </form>
    </header>
    <main>
      <MoviesContainer movies={movies} />
      {searchError && <p>{searchError}</p>}
    </main>
  </div>
)
}

export default App
