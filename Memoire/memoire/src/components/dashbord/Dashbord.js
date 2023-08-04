import { Card, CardContent,Container,Grid,Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import Utilisateurs from './Utilisateurs';
import Patients from './Patients';
import Recette from './Recette';
import Stats from './Stats';
import Age from './Age';
import ConsultChart from './ConsultChart';
import { useAuth } from '../../hooks/useAuth';
function Dashbord() {
    const {user}=useAuth()
  return (
    <Container style={{width:'100%',height:'100%'}} disableGutters	>
      <Typography variant='h4'>statics</Typography>
   <Grid container direction='row' spacing={4} alignItems='center'  justifyContent='space-around'  >
    <Grid item container direction='row' spacing={4} alignItems='center'  justifyContent='space-around'>
    {user.role=='Admin'&&<Grid item  xs={2}><Utilisateurs/></Grid>}
    <Grid item  xs={2}><Patients/></Grid>
    <Grid item xs={2}> <Recette/></Grid>
    </Grid>
    <Grid container direction='row' spacing={0} alignItems='center'  justifyContent='flex-start'  >
    <Grid item xs={8}><Stats/></Grid>
    <Grid item xs={4}><Age/></Grid>
    <Grid item xs={12}><ConsultChart/></Grid>
</Grid>
   </Grid>
   </Container>
  )
}

export default Dashbord