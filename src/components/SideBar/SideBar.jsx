import React from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemButton, Link, CircularProgress, Box, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logoBlue from '../utils/images/logoBlue.png';
import logoRed from '../utils/images/logoRed.png';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];
const SideBar = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

  return (
    <div>
      <Link
        component={RouterLink}
        to="/"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <img
          style={{ width: '240px', objectFit: 'contain' }}
          src={theme.palette.mode === 'light' ? logoBlue : logoRed}
          alt="Filmscreen"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <ListItem key={value} disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} height={40} style={{ filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'light' }} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(id))}
            >
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} height={40} style={{ filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'light' }} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default SideBar;
