import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BottomNavbar({ goToAllChats }) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const objectForActions = {
    '0': function () {
      goToAllChats();
    },
    '1': function () {
      navigate('/');
    },
    '2': function () {
      navigate('/profile');
    }
  }

  return (<BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
      objectForActions[newValue]();
    }}
  >
    <BottomNavigationAction label="All chats" icon={<KeyboardBackspaceIcon />} />
    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
    <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
  </BottomNavigation >)
}

