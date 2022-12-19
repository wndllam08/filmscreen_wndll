import { useTheme } from '@mui/material/styles';

export const movieStyles = {
  alignItems: 'center',
  fontWeight: 'bolder',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    cursor: 'pointer',

  },
};

export const imgStyles = {
  borderRadius: '20px',
  height: '300px',
  marginBottom: '10px',
  transition: 'transform 0.2s',
  transform: 'scale(1)',
  ':hover': {
    transform: 'scale(1.05)',
  },
};

export const typographyStyles = () => {
  const theme = useTheme();
  return {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
  };
};
