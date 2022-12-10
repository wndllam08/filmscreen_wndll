import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import styles from './styles';
import { Actors, MovieInformation, Movies, NavBar, Profile } from '.';

const App = () => {
  const { classes } = styles();
  console.log('app');
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route
            exact
            path="/movie/:id"
            element={
              <MovieInformation />
        }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/actors/:id"
            element={
              <Actors />
        }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Movies />
        }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/profile/:id"
            element={
              <Profile />
        }
          />
        </Routes>
      </main>

    </div>
  );
};

export default App;
