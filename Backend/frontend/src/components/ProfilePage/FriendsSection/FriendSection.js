import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import {
  acceptFriendRequest,
  getAllFriends,
  getFriendRequests,
  rejectFriendRequest,
} from '../../../services/user';
import TabCard from '../../../common/TabCard/TabCard';
import NoDataFoundFallback from '../../../common/NoDataFoundFallback';
import { useToast } from '../../../common/Toast';
import { INTERNAL_SERVER_ERROR, PROFILE_TABS } from '../../../constants';

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
  const { toast, showToast } = useToast();
  // const tabDataTemp = [
  //   {
  //     _id: 'some-id',
  //     name: 'Some name',
  //     username: 'username',
  //   },
  // ];
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

  const acceptFriendRequestHandler = async (e, userId) => {
    try {
      const { status } = await acceptFriendRequest(userId);
      if (status !== 200) {
        showToast({
          ...toast,
          isVisible: true,
          type: 'error',
          text: 'Something went wrong',
        });
        return;
      }
      setIsLoading(true);
      const { data } = await getFriendRequests('pending');
      setTabData(data.pendingRequests);

      showToast({
        ...toast,
        isVisible: true,
        type: 'success',
        text: 'Request accepted successfully',
      });
    } catch (error) {
      console.error(
        'Some error occured while accepting the friend request ',
        error
      );
      showToast({
        ...toast,
        isVisible: true,
        text: INTERNAL_SERVER_ERROR,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const rejectFriendRequestHandler = async (e, userId) => {
    try {
      const { status } = await rejectFriendRequest(userId);
      if (status !== 200) {
        showToast({
          ...toast,
          isVisible: true,
          type: 'error',
          text: 'Something went wrong',
        });
        return;
      }
      setIsLoading(true);
      const { data } = await getFriendRequests('incoming');
      setTabData(data.incomingRequests);

      showToast({
        ...toast,
        isVisible: true,
        text: 'Request rejected successfully',
        type: 'success',
      });
    } catch (error) {
      console.error(
        'Some error occured while rejecting the friend request ',
        error
      );
      showToast({
        ...toast,
        isVisible: true,
        text: INTERNAL_SERVER_ERROR,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
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
                acceptFriendRequestHandler={acceptFriendRequestHandler}
                rejectFriendRequestHandler={rejectFriendRequestHandler}
              />
            ))
          )}
        </TabPanel>
      ))}
    </Box>
  );
}
