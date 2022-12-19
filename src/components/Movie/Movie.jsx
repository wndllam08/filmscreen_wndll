import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { movieStyles, imgStyles, typographyStyles } from './styles';

function Movie({ movie, i }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: '10px' }}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link style={movieStyles} to={`/movie/${movie.id}`}>
          <Box sx={imgStyles}>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
              alt={movie.title}
              style={imgStyles}
            />
          </Box>
          <Typography sx={typographyStyles} variant="h5">{movie.title}</Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
