import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies';

export function useSearch() {
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);
    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === '';
            return
        }
        if (search === '') {
            setError("Cant be an empty search")
            return;
        }

        setError(null);
    }, [search])

    return { search, setSearch, error }
}


export const useMovies = (search, sort) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const prevSearch = useRef(search);

    const getMovies = useCallback(async (search) => {
        if (search === prevSearch.current) return
        try {
            setLoading(true)
            setError(null)
            prevSearch.current = search
            const newMovies = await searchMovies(search)
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const sortedMovies = useMemo(() => {
        return sort ?
            [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    },[sort, movies])
    return { movies: sortedMovies, getMovies, loading, searchError: error }
}