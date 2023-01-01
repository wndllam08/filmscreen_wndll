import { styled, Typography } from '@mui/material';

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textOverflow: 'ellipsis',
  width: '230px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginTop: '10px',
  marginBottom: 0,
  textAlign: 'center',
}));

export const Links = styled('div')(({ theme }) => ({
  alignItems: 'center',
  fontWeight: 'bolder',
  cursor: 'pointer',
  [theme.breakpoints.up('xs')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const Img = styled('img')(() => ({
  borderRadius: '10px',
  height: '300px',
  marginBottom: '10px',
  transition: 'transform 0.2s',
  transform: 'scale(1)',
  ':hover': {
    transform: 'scale(1.05)',
  },
}));
