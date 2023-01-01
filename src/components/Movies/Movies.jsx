import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Movies = () => {
  const [page, setpage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isFetching ? (

        <Box display="flex" justifyContent="center">
          <CircularProgress size="4rem" />
        </Box>

      ) : data ? (
        <div>
          <MovieList movies={data} />
        </div>
      ) : (
        <Box display="flex" alignItems="center" mt="20px">
          <Typography variant="h4">
            No Movies that match that name.
            <br />
            Please search for something else.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Movies;
