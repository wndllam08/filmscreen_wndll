import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';

import { SideBar, SearchBar } from '..';
import { DrawerPaper, IconBtn, LinkBtn, Nav, StyledToolbar } from './styles';
import { fetchToken, createSessionId, moviesApi } from '../utils';

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('request_token');
  const sessionIdLS = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdLS) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdLS}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <StyledToolbar>
          {isMobile && (
          <IconBtn
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prevState) => !prevState)}
          >
            <Menu />
          </IconBtn>
          )}

          <IconButton
            color="inherit"
            sx={{ ml: 2 }}
            onClick={() => {}}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <SearchBar />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Log in &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn
                color="inherit"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                {!isMobile && <><p style={{ whiteSpace: 'nowrap' }}> My Movies</p> &nbsp;</>}
                <Avatar
                  sx={{ width: '30px', height: '30px' }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </LinkBtn>
            )}
          </div>
          {isMobile && <SearchBar />}
        </StyledToolbar>
      </AppBar>
      <div>
        <Nav>
          {isMobile ? (
            <DrawerPaper
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </DrawerPaper>
          ) : (
            <Drawer variant="permanent" open>
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Nav>
      </div>
    </>
  );
};

export default NavBar;
