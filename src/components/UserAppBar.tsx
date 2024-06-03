import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import FullScreenDialog from './SearchDialog';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../actions/AuthActions';
import AuthContext from '../contexts/authContext';
import LogoutIcon from '@mui/icons-material/Logout';

const pages = [{page:'Home' , path:'/'}, {page:'My List', path: '/my-list'}, {page:'Genres', path:'/genres'}];

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const UserAppBar = () => {
  const {user} = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isAppBarTransparent, setIsAppBarTransparent] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsAppBarTransparent(true);
      } else {
        setIsAppBarTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: isAppBarTransparent ? 'transparent': 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            STARMOVIES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem sx={{
                  '&:hover': {
                    color: "#5aa17f"
                  }
                }} key={index} onClick={() => {
                  navigate(page.path);
                }}>
                  <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StarMovies
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => {
                  navigate(page.path);
                }}
                sx={{ my: 2, color: 'white' ,display: 'block'  , '&:hover': {
                  color: "#5aa17f"
                }}}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          <SearchIconWrapper onClick={() => {handleClickOpen()}}>
            <SearchIcon />
          </SearchIconWrapper>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='' src="adultDefault.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

        <MenuItem sx={{borderBottom: "1px solid gray"}}>
          <Typography variant="body1" sx={{ textAlign: 'center', width: "100%" ,fontWeight: 'bold', fontSize: 24 ,py: 1 , color: "#55fdc4"}}>
            {user.displayName}
          </Typography>
        </MenuItem>

        <MenuItem sx={{borderBottom: "1px solid gray"}}>
          <Typography variant="body2" sx={{ textAlign: 'center', width: "100%" ,fontStyle: 'italic', fontSize: 16 , py: 1 ,color: 'text.secondary' }}>
            {user.email}
          </Typography>
        </MenuItem>
              
            <MenuItem onClick={async () => {
              try {
                await handleSignOut();
                navigate("/signin");
              } catch {
                console.log("error in sign out");
              }
            }} sx={{display: "flex", justifyContent: "center"}}>
              <LogoutIcon sx={{color: "#f97171"}}/> 
              <Typography sx={{color: "#f97171", py: 1}}>
                Logout
                </Typography>
            </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <FullScreenDialog open={open} handleClose={handleClose} />
    </AppBar>
  );
}

export default UserAppBar;
