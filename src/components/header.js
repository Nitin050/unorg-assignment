import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [hideSearch, setHideSearch] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setMobileOpen(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const drawerWidth = 200;
  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <img src={process.env.PUBLIC_URL + 'LOGO.png'} alt='mySvgImage' />
      <List>
        {['Home', 'Items', 'Orders', 'Vehicles', 'Trips'].map((text, index) => (
          <ListItem key={text} className={text=='Items' && 'active'} disablePadding>
            <ListItemButton>
              <ListItemText sx={{color:'#fff', alignItems: 'end'}} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
    <AppBar 
      className='header' 
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: 'none'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <img src={process.env.PUBLIC_URL + 'Icons/menu.svg'} />
            </IconButton>
          </Box>
          <Box onClick={()=>setHideSearch(false)} className='searchParent' sx={{ flexGrow: 1, display: 'flex' }}>
            <OutlinedInput
              type={'text'}
              className={`search ${window?.innerWidth<900 && hideSearch ? 'hide' : ''}`}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                  >
                    <img style={{scale: '.5'}} src={process.env.PUBLIC_URL + 'Icons/Search.svg'} alt='mySvgImage' />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Search"
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <CardHeader
              className='userprofile'
              sx={{textAlign:'left', padding: '0'}}
              avatar={
                <Avatar src={process.env.PUBLIC_URL + 'User.png'}>
                  R
                </Avatar>
              }
              title="Welcome"
              subheader="Kushagraa"
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <Drawer
      variant="temporary"
      open={mobileOpen}
      className = 'sidebar'
      onClose={()=>setMobileOpen(false)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
    <Drawer
      variant="permanent"
      className = 'sidebar'
      sx={{
        display: { xs: 'none', sm: 'block' },
        textAlign: 'left',
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>

    </>
  );
}
export default ResponsiveAppBar;