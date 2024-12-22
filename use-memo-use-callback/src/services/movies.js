const API_KEY = '4a26bb4';

export const searchMovies = async (query) => {
    if (query === '') return null
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        const json = await res.json();
        const movies = json.Search

        return movies?.map(m => {
            return {
                id: m.imdbID,
                title: m.Title,
                year: m.Year,
                poster: m.Poster
            }
        })
    } catch(error) {
        throw new Error("Error searching movies.");
    }
}