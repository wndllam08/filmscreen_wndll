import { Box, CircularProgress, Typography, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorQuery,
} from '../../services/TMDB';
import { ActorImage } from './styles';
import { MovieList } from '..';

const Actors = () => {
  const page = 1;
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorsDetailsQuery({ actor_id: id });
  const { data: movies } = useGetMoviesByActorQuery({ actor_id: id, page });
  const navigate = useNavigate();
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isFetching ? (

        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size="8rem" />
        </Box>

      ) : data ? (
        <>
          <Grid container spacing={3}>
            <Grid
              item
              lg={5}
              xl={4}
            >
              <ActorImage
                src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
                alt={data?.name}
              />
            </Grid>

            <Grid
              item
              lg={7}
              xl={8}
              sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',
              }}
            >

              <Typography variant="h2" gutterBottom>
                {data?.also_known_as.find((name) => name.match(/[a-zA-Z]+/))}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Born: {new Date(data?.birthday).toDateString()}
              </Typography>
              <Typography variant="body1" align="justify" paragraph>
                {data?.biography || 'Sorry, no biography yet...'}
              </Typography>

              <Box marginTop="2rem" display="flex" justifyContent="space-around">
                <Button
                  variant="contained"
                  color="primary"
                  target="_blank"
                  href={`https://www.imdb.com/name/${data?.imdb_id}`}
                >
                  IMDB
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)}
                  color="primary"
                >
                  Back
                </Button>
              </Box>

            </Grid>
          </Grid>
          <Box margin="2rem 0">
            <Typography variant="h2" gutterBottom align="center">
              Movies
            </Typography>
            {movies && <MovieList movies={movies} limit={12} />}
          </Box>
        </>
      ) : null }
    </div>
  );
};

export default Actors;
