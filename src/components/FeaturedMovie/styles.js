import { Box, Card, CardContent, CardMedia, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  height: '490px',
  textDecoration: 'none',
  cursor: 'pointer',
}));

export const StyledCard = styled(Card)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  position: 'relative',
}));

export const StyledCardMedia = styled(CardMedia)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.575)',
  backgroundBlendMode: 'darken',
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  color: '#fff',
  width: '40%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  position: 'relative',
  backgroundColor: 'transparent',
}));
