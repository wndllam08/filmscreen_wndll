import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, Box } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import * as styles from './styles';
import { SideBar, SearchBar } from '..';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={styles.toolbar}>
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            sx={styles.menuButton}
          >
            <Menu />
          </IconButton>
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
              <Button
                color="inherit"
                component={Link}
                to="/profile/:id"
                onClick={() => {}}
                sx={styles.linkButton}
              >
                {!isMobile && <><p style={{ whiteSpace: 'nowrap' }}> My Movies</p> &nbsp;</>}
                <Avatar sx={{ width: '30px', height: '30px' }} alt="Profile" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" />
              </Button>
            )}
          </div>
          {isMobile && <SearchBar />}
        </Toolbar>
      </AppBar>
      <Box>
        <Box sx={styles.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: styles.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: styles.drawerPaper }} variant="permanent" open>
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
