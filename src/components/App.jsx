import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInformation, Movies, NavBar, Profile } from '.';

const App = () => (
  <Box sx={{ display: 'flex', height: '100%' }}>
    <CssBaseline />
    <NavBar />
    <main style={{ flexGrow: '1', padding: '2em' }}>
      <Box sx={{ height: '70px' }} />
      <Routes>
        <Route exact path="/movie/:id" element={<MovieInformation />} />
        <Route exact path="/actors/:id " element={<Actors />} />
        <Route exact path="/" element={<Movies />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
    </main>
  </Box>
);

export default App;
