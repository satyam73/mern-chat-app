import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import UserSearch from '../common/UserSearch';
import { useUser } from '../contexts/UserProvider';

import { useAuth } from '../contexts/AuthProvider';
import { debounce } from '../utils';
import { getUsersByUsername, signOut } from '../services/user';

import '../utils.css';
import { useMediaQuery } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const menuId = 'primary-menu';
  const isMobileScreen = useMediaQuery('(max-width: 1007px)', { defaultMatches: null });

  useEffect(() => {
    const onBodyClick = (e) => {
      setProfiles([]);
    };
    document.addEventListener('click', onBodyClick);
    return () => document.removeEventListener('click', onBodyClick);
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = async () => {
    console.log('before')
    const { status } = await signOut();
    console.log('after ', status)
    if (status === 200) {

      console.log('status if ', status)
      setUser({});
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: -10,
        horizontal: 10,
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          style={{
            textDecoration: 'none',
            color: 'inherit',
            marginBottom: 0,
            padding: '4px',
          }}
          to={'/profile'}
        >
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <p
          style={{
            textDecoration: 'none',
            color: 'red',
            marginBottom: 0,
            padding: '4px',
          }}
          onClick={signOutHandler}
        >
          Sign Out
        </p>
      </MenuItem>
    </Menu>
  );

  const [profiles, setProfiles] = useState([]);

  const searchHandler = debounce(onUserSearch);

  async function onUserSearch(evt) {
    try {
      const searchedUserName = evt.target.value.trim();

      if (!searchedUserName) {
        setProfiles([]);
        return;
      }

      const {
        data: { users },
      } = await getUsersByUsername(searchedUserName);
      setProfiles(users);
    } catch (err) {
      console.error('Error : ', err);
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        '& .MuiPaper-root': {
          backgroundColor: location.pathname !== '/' ? 'white' : '#00d5c7',
          color: location.pathname !== '/' ? 'black' : 'white',
        },
      }}
    >
      <AppBar position='static'>
        <UserSearch
          profiles={profiles}
          style={{ display: profiles.length >= 1 ? 'block' : 'none' }}
        />
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { sm: 'block' }, overflow: 'unset', fontWeight: '500', fontSize: '1.7rem', fontFamily: "'Lemon', serif" }}
          >
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: location.pathname !== '/' ? 'black' : 'white',
              }}
            >
              {isMobileScreen ? 'C' : 'Convo'}
            </Link>
          </Typography>
          {isLoggedIn && (
            <Search
              sx={{
                borderRadius: '20px',
                backgroundColor: '#e3e3e380',
                '&:hover': { backgroundColor: '#e3e3e380' },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onInput={searchHandler}
                placeholder='Search Profile'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn && (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={menuId}
                  onClick={handleProfileMenuOpen}
                  aria-haspopup='true'
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box >
  );
}
