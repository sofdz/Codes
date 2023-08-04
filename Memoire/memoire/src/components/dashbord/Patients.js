import { Card, CardContent,Divider,Grid,Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import AccessibleIcon from '@mui/icons-material/Accessible';
function Patients() {
    const [Patients,setPatients]=useState(null)
    useEffect(()=>{
        fetch('/statPat').then(res=>{res.json().then(data=>{setPatients(data)})})
        },[])
  return (
    <>
    {Patients&&
    <Card  style={{boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
 <Grid  item style={{backgroundColor:'#42a5f5',color:'#ffffff',borderRadius:'5px',boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}> <AccessibleIcon style={{fontSize:'4rem'}} /></Grid>
 <Grid item ><CardContent>
    <Grid item container justifyContent='space-between' direction='column'>
     <Typography variant='h6' >Patients</Typography>
    <Typography variant='h5'>{Patients.nbPatiens}</Typography> 
    </Grid>
    </CardContent> 
    </Grid>
    </Grid>
    <Divider />
<Typography variant='span' style={{fontSize:'10px',color:'#42a5f5'}} display='flex' flexDirection='row' justifyContent='space-between' ><strong>Patients avec rdv: {Patients.nbpatrdvs}</strong> <strong>Patients dans la file:{Patients.nbpatfile}</strong></Typography>
    </Card>
}
</>
  )
}

export default Patients