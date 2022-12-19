import { useTheme } from '@mui/material/styles';

export const root = () => {
  const theme = useTheme();
  return {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  };
};
