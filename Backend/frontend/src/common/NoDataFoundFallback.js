import { Typography } from '@mui/material'
import React from 'react'

export default function NoDataFoundFallback() {
  return (
    <Typography component='span' sx={{ textAlign: 'center', width: '100%', display: 'block' }} >No record found!</Typography>
  )
}