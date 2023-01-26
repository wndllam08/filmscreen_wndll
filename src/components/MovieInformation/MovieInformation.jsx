import React, { useEffect, useState } from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import { GridContainer, Poster, GenresContainer, Links, GenreImg, CharImg, BtnsContainer, StyledModal, VideoIframe } from './styles';
import { MovieList } from '..';
import { userSelector } from '../../features/auth';

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1 });
  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId:
    localStorage.getItem('session_id'),
    page: 1 });

  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id),
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id),
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      },

    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchListed,
      },
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

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
                    <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
                  </ButtonGroup>
                </BtnsContainer>
                <BtnsContainer item xs={12} sm={6}>
                  <ButtonGroup size="medium" variant="outlined">
                    <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                      {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                    </Button>
                    <Button onClick={addToWatchlist} endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}>
                      Wathclist
                    </Button>
                    <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                      <Typography
                        onClick={() => navigate('/')}
                        color="inherit"
                        variant="subtitle2"
                      >
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
            {
              isRecommendationsFetching ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress size="8rem" />
                </Box>
              )
                : recommendations ? <MovieList movies={recommendations} numberOfMovies={12} />
                  : <Box>Sorry nothing was found</Box>
            }
          </Box>
          <StyledModal
            closeAfterTransition
            open={open}
            onClose={() => setOpen(false)}
          >
            {data?.videos?.results?.length > 0 && (
            <VideoIframe
              autoPlay
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
            )}
          </StyledModal>
        </GridContainer>
      ) : null }
    </div>
  );
};

export default MovieInformation;
