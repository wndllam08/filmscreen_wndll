const drawerWidth = 240;

export const toolbar = ((theme) => ({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '240px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '0',
    flexWrap: 'wrap',
    height: '120px',
  },
}));

export const menuButton = ((theme) => ({

  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  outline: 'none',

}));

export const drawer = ((theme) => ({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

export const drawerPaper = {
  width: drawerWidth,
};

export const linkButton = {
  '&:hover': {
    color: 'white !important',
    textDecoration: 'none',
  },
};
