import React from 'react';
import { Divider, List, ListItemText, ListSubheader, ListItemIcon, ListItemButton, Box, CircularProgress, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GenreImg, LinkContainer, StyledLink } from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';

import logoBlue from '../utils/images/logoBlue.png';
import logoRed from '../utils/images/logoRed.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const SideBar = () => {
  const theme = useTheme();
  const { data, isLoading, error } = useGetGenresQuery();
  const dispatch = useDispatch();
  // const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  return (
    <>
      <LinkContainer
        to="/"

      >
        <img
          style={{ width: '240px',
            objectFit: 'contain' }}
          src={theme.palette.mode === 'light' ? logoBlue : logoRed}
          alt="Filmpire Logo"
        />
      </LinkContainer>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <StyledLink key={value}>
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <GenreImg src={genreIcons[label.toLowerCase()]} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>

      <Divider />
      <ListSubheader>Genres</ListSubheader>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size="4rem" />
        </Box>
      ) : data ? (
        <List>
          {data?.genres?.map(({ name, id }) => (
            <StyledLink key={id}>
              <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <GenreImg src={genreIcons[name.toLowerCase()]} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </StyledLink>
          ))}
        </List>
      ) : null}
    </>
  );
};
export default SideBar;
