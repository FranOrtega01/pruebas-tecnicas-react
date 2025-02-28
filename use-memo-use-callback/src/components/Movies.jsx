const MovieList = ({ movies }) => {

    return (
    <ul className="movies">
        {
            movies.map(m => (
                <li className="movie" key={m.id}>
                    <h3>{m.title}</h3>
                    <p>{m.year}</p>
                    <img src={m.poster} alt={m.title} />
                </li>
            ))
        }
    </ul>
    )
}

const NoMovies = () => {
    return (
        <p>No movies results!</p>
    )
}

export const MoviesContainer = ({movies}) => {
    const hasMovies = movies?.length > 0;

        return(
            hasMovies ?
            <MovieList movies={movies} />
            : <NoMovies />
        )

}