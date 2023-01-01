import React from 'react';
import { MoviesContainer } from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies }) => (
  <div>
    <MoviesContainer container>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </MoviesContainer>
  </div>
);

export default MovieList;
