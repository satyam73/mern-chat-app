import React from 'react';
import { Button, TextField, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoCamera } from '@mui/icons-material';
export default function EditModal({
  showModal,
  setShowModal,
  profile,
  setProfile,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    color: 'black !important',
    boxShadow: 24,
    p: 2,
    pt: 0,
  };

  return (
    <Modal
      open={showModal}
      // onClose={() => setShowModal(false)}
      aria-labelledby='profile-update-modal'
      aria-describedby='This modal is used to update the user details'
      sx={{ opacity: 1 }}
    >
      <Box className='container-fluid rounded-3' sx={style}>
        <div className='row justify-content-end'>
          <CloseIcon
            sx={{ color: 'black', fontSize: '60px', cursor: 'pointer' }}
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className='row'>
          <h4 className='text-secondary fw-bold text-center'>Change Details</h4>
        </div>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <img
              class='profileImg my-4'
              src={
                profile === ''
                  ? 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                  : profile
              }
              alt=''
              style={{
                height: '150px',
                width: '150px',
                borderRadius: '100px',
                border: '5px solid var(--primary-color)',
              }}
            />
            <IconButton
              sx={{
                fontSize: '40px',
                backgroundColor: 'var(--secondary-color)',
                '&:hover': {
                  backgroundColor: 'var(--primary-color)',
                },
              }}
              aria-label='upload picture'
              component='label'
            >
              <input
                hidden
                accept='image/*'
                multiple
                type='file'
                onChange={(evt) =>
                  setProfile(URL.createObjectURL(evt.target.files[0]))
                }
              />
              <PhotoCamera sx={{ color: 'white' }} />
            </IconButton>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <TextField
              sx={{
                width: '100%',
                '&:after': {
                  borderBottom: '2px solid var(--primary-color)',
                },
              }}
              id='filled-basic'
              label='Name'
              variant='filled'
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <TextField
              sx={{
                width: '100%',
                '&:after': {
                  borderBottom: '2px solid var(--primary-color)',
                },
              }}
              id='filled-basic'
              label='Username'
              variant='filled'
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <TextField
              sx={{
                width: '100%',
                '&:after': {
                  borderBottom: '2px solid var(--primary-color)',
                },
              }}
              id='filled-basic'
              label='Password'
              variant='filled'
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <TextField
              sx={{
                width: '100%',
                '&:after': {
                  borderBottom: '2px solid var(--primary-color)',
                },
              }}
              id='filled-basic'
              label='Confirm Password'
              variant='filled'
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12'>
            <Button
              sx={{
                width: '100%',
                pt: 1.6,
                pb: 1.6,
                fontSize: '15px',
                backgroundColor: 'var(--primary-color)',
                '&:hover': {
                  backgroundColor: 'var(--secondary-color)',
                },
              }}
              variant='contained'
            >
              Change
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
