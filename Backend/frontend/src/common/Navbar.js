import React, { useState } from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import UserSearch from '../common/UserSearch';
import { useUser } from '../contexts/UserProvider';

import { SEARCH_API_URL } from '../constants';
import { SIGNOUT_URL } from '../constants';

import '../utils.css';
import { useAuth } from '../contexts/AuthProvider';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
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

export default function PrimarySearchAppBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { isLoggedIn } = useAuth();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = async (evt) => {
    const { status } = await axios.get(SIGNOUT_URL, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    if (status === 200) {
      setUser({});
      navigate('/login');
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: '-10px',
        horizontal: '10px',
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
  async function searchHandler(evt) {
    try {
      const searchedUserName = evt.target.value;
      const ENDPOINT = SEARCH_API_URL(searchedUserName);
      if (!searchedUserName) {
        return;
      }

      const response = await fetch(ENDPOINT, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const { users } = await response.json();
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
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: location.pathname !== '/' ? 'black' : 'white',
              }}
            >
              Convo
            </Link>
          </Typography>
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
              // onBlur={() => {
              //   setProfiles([]);
              // }}
              placeholder='Search Profile'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
    </Box>
  );
}
