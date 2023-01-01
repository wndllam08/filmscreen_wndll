import React, { useState } from 'react';
import { AppBar, IconButton, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { SideBar, SearchBar } from '..';
import { DrawerPaper, IconBtn, LinkBtn, Nav, StyledToolbar } from './styles';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <StyledToolbar>
          {isMobile && (
          <IconBtn
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
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
              <Button
                color="inherit"
                onClick={() => {}}
              >
                Log in &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn
                color="inherit"
                component={Link}
                to="/profile/:id"
                onClick={() => {}}
              >
                {!isMobile && <><p style={{ whiteSpace: 'nowrap' }}> My Movies</p> &nbsp;</>}
                <Avatar
                  sx={{ width: '30px', height: '30px' }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
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
