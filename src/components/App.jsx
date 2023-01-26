import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInformation, Movies, NavBar, Profile } from '.';
import { Content, Main, StyledToolbar } from './styles';

const App = () => (
  <Main>
    <CssBaseline />
    <NavBar />
    <Content>
      <StyledToolbar />
      <Routes>
        <Route exact path="/" element={<Movies />} />
        <Route exact path="/movie/:id" element={<MovieInformation />} />
        <Route exact path="/actors/:id" element={<Actors />} />
        <Route exact path="approved" element={<Movies />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
    </Content>
  </Main>
);

export default App;
