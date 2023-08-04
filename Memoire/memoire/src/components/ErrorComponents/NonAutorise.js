import { Typography,Box } from '@mui/material'
import React from 'react'

function NonAutorise({titre,contenu}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>{titre}!</h1>
      <h4>{contenu}</h4>
    </Box>
 
  )
}

export default NonAutorise