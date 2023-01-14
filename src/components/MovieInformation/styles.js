import { Box, Grid, styled } from '@mui/material';

export const GridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  margin: '10px 0 !important',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
}));

export const Poster = styled('img')(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
  width: '80%',
  height: 'auto',
  [theme.breakpoints.down('lg')]: {
    margin: '0 auto',
  },
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '350px',
    marginBottom: '30px',
  },
}));

export const GenresContainer = styled(Grid)(() => ({
  margin: '10px 0 !important',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',

}));

export const Links = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem 1rem',
  },
}));

export const GenreImg = styled('img')(({ theme }) => ({
  filter: theme.palette.mode === 'dark' && 'invert(1)',
  marginRight: '10px',
  height: '40px',
}));

export const CharImg = styled('img')(() => ({
  width: '100%',
  maxWidth: '7em',
  height: '9em',
  objectFit: 'cover',
  borderRadius: '10px',
}));

export const BtnsContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    marginBottom: '1rem',
  },
}));
