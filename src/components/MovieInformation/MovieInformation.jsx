import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import { GridContainer, Poster, GenresContainer, Links, GenreImg, CharImg, BtnsContainer } from './styles';
import { MovieList } from '..';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });

  const isMovieFav = true;
  const isMovieWatch = false;

  const addToFavorites = () => {

  };
  const addToWatchlist = () => {

  };

  console.log(recommendations);
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isFetching ? (

        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size="8rem" />
        </Box>

      ) : data ? (
        <GridContainer container>

          <Grid
            item
            sm={12}
            lg={4}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '30px',
            }}
          >
            <Poster
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt={data?.title}
            />
          </Grid>

          <Grid item container direction="column" lg={7}>

            <Typography variant="h3" align="center" gutterBottom>
              {data?.title} ({data.release_date.split('-')[0]})
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              {data?.tagline}
            </Typography>

            <GridContainer item>
              <Box display="flex" align="center">
                <Rating readOnly value={data.vote_average / 2} />
                <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '10px' }}>{data?.vote_average} / 10 </Typography>
              </Box>
              <Typography variant="h6" align="center" gutterBottom>
                {data?.runtime}min | Language: {data?.spoken_languages[0].name}
              </Typography>
            </GridContainer>

            <GenresContainer item>
              {data?.genres?.map((genre) => (
                <Links
                  style={{ cursor: 'pointer' }}
                  key={genre.id}
                  onClick={() => {
                    navigate('/');
                    dispatch(selectGenreOrCategory(genre.id));
                  }}
                >
                  <GenreImg src={genreIcons[genre.name.toLowerCase()]} alt="" />
                  <Typography color="textPrimary" variant="subtitle1">
                    {genre?.name}
                  </Typography>
                </Links>
              ))}
            </GenresContainer>

            <Typography variant="h5" gutterBottom sx={{ marginTop: '10px' }}>
              Overview
            </Typography>
            <Typography sx={{ marginBottom: '2rem' }}>
              {data?.overview}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ marginTop: '10px' }}>
              Top Cast
            </Typography>

            <Grid item container spacing={2}>
              {data && data.credits.cast.map((character, i) => (
                character.profile_path && (
                <Grid key={i} item xs={4} md={2} sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => navigate(`/actors/${character.id}`)}>
                  <CharImg src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} />
                  <Typography color="textPrimary">
                    {character?.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {character?.character}
                  </Typography>
                </Grid>
                )
              )).slice(0, 6)}
            </Grid>

            <Grid item container sx={{ marginTop: '2rem' }}>
              <BtnsContainer>
                <BtnsContainer item xs={12} sm={6}>
                  <ButtonGroup size="medium" variant="outlined">
                    <Button target="blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                    <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}> IMDB </Button>
                    <Button onClick={() => {}} href="#" endIcon={<Theaters />}>Trailer</Button>
                  </ButtonGroup>
                </BtnsContainer>
                <BtnsContainer item xs={12} sm={6}>
                  <ButtonGroup size="medium" variant="outlined">
                    <Button onClick={addToFavorites} endIcon={isMovieFav ? <FavoriteBorderOutlined /> : <Favorite />}>
                      {isMovieFav ? 'Unfavorite' : 'Favorite'}
                    </Button>
                    <Button onClick={addToWatchlist} endIcon={isMovieWatch ? <Remove /> : <PlusOne />}>
                      Wathclist
                    </Button>
                    <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                      <Typography onClick={() => navigate('/')} color="inherit" variant="subtitle2">
                        Back
                      </Typography>
                    </Button>
                  </ButtonGroup>
                </BtnsContainer>
              </BtnsContainer>
            </Grid>

          </Grid>
          <Box marginTop="5rem" width="100%">
            <Typography variant="h3" gutterBottom align="center">You might also like</Typography>
            {recommendations
              ? <MovieList movies={recommendations} numberOfMovies={12} />
              : <Box>Sorry nothing was found</Box> }
          </Box>
        </GridContainer>
      ) : null }
    </div>
  );
};

export default MovieInformation;
