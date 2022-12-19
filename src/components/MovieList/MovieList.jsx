import React from 'react';
import Grid from '@mui/material/Grid';
import { Movie } from '..';
import { root } from './styles';

const MovieList = ({ movies }) => (
  <Grid
    container
    sx={root}
  >
    {movies.results.map((movie, i) => (
      <Movie key={i} movie={movie} i={i} />
    ))}

  </Grid>
);

export default MovieList;
