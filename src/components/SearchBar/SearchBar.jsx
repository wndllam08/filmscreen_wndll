import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './styles';

const SearchBar = () => (
  <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </Search>

);

export default SearchBar;
