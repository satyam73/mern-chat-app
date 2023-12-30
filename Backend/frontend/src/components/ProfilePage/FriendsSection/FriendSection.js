import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { PROFILE_TABS } from '../../../constants';
import TabCard from '../../../common/TabCard/TabCard';
import { getAllFriends, getFriendRequests } from '../../../services/user';
import NoDataFoundFallback from '../../../common/NoDataFoundFallback';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FriendSection() {
  const [tabValue, setTabValue] = useState(0);
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllFriends();
        setTabData(data.friends);
      } catch (error) {
        console.error('Some error occured while fetching friends ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleChange = async (e, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setIsLoading(true);
      try {
        const { data } = await getAllFriends();
        setTabData(data.friends);
      } catch (error) {
        console.error('Some error occured while fetching friends ', error);
      } finally {
        setIsLoading(false);
      }
      return;
    }
    if (newValue === 1) {
      setIsLoading(true);
      try {
        const { data } = await getFriendRequests('incoming');
        setTabData(data.incomingRequests);
      } catch (error) {
        console.error(
          'Some error occured while fetching incoming friend requests ',
          error
        );
      } finally {
        setIsLoading(false);
      }
      return;
    }
    if (newValue === 2) {
      setIsLoading(true);
      try {
        const { data } = await getFriendRequests('pending');
        setTabData(data.pendingRequests);
      } catch (error) {
        console.error(
          'Some error occured while fetching pending/sent friend requests ',
          error
        );
      } finally {
        setIsLoading(false);
      }
      return;
    }
  };

  return (
    <Box className='friend-section'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          {PROFILE_TABS.map((tab, index) => (
            <Tab key={index} label={tab} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {PROFILE_TABS.map((tab, index) => (
        <TabPanel
          key={index}
          className='tabContent'
          value={tabValue}
          index={index}
        >
          {tabData.length === 0 ? (
            <NoDataFoundFallback />
          ) : (
            tabData.map((item) => (
              <TabCard
                tabValue={tabValue}
                id={item._id}
                key={item._id}
                name={item.name}
                profileImg={item.profilePic}
                isLoading={isLoading}
              />
            ))
          )}
        </TabPanel>
      ))}
    </Box>
  );
}
