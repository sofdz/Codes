import { Card, CardContent,Grid,Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
function Utilisateurs() {
    const [users,setusers]=useState(null)
    useEffect(()=>{
        fetch(process.env.BACK+'/userss').then(res=>{res.json().then(data=>{setusers(data)})})
        },[])
  return (
    <>
    {users&&
    <Card style={{boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
 <Grid item style={{backgroundColor:'#42a5f5',color:'#ffffff',borderRadius:'5px',boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}> <PersonIcon style={{fontSize:'4rem'}} /></Grid>
 <Grid item ><CardContent>
 <Grid item container justifyContent='space-between' direction='column'>
     <Typography variant='h6' >Utilisateurs</Typography>
    <Typography variant='h5'>{users.length}</Typography> 
    </Grid>
    </CardContent> 
    </Grid>
    </Grid>
    </Card>
}
</>
  )
}

export default Utilisateurs