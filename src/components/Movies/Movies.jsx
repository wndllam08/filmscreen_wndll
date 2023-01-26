import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { FeaturedMovie, MovieList, Pagination } from '..';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 17 : 19;
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isFetching ? (

        <Box display="flex" justifyContent="center">
          <CircularProgress size="8rem" />
        </Box>

      ) : data ? (
        <div>
          <FeaturedMovie movie={data.results[0]} />
          <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
          <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
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
