import React from 'react';
import { MoviesContainer } from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <div>
      <MoviesContainer container>
        {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
          <Movie key={i} movie={movie} i={i} />
        ))}
      </MoviesContainer>
    </div>
  );
};
export default MovieList;
