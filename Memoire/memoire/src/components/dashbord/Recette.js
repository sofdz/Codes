import { Card, CardContent,Divider,Grid,Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import EvolutionRecette from './EvolutionRecette';
function Recette() {
    const [Recette,setRecette]=useState(null)
    useEffect(()=>{
        fetch('/recette').then(res=>{res.json().then(data=>{console.log(data);setRecette(data)})})
        },[])
  return (
    <>
    {Recette&&
    <Card style={{boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
 <Grid  item style={{backgroundColor:'#42a5f5',color:'#ffffff',borderRadius:'5px',boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}> <PointOfSaleIcon style={{fontSize:'4rem'}} /></Grid>
 <Grid item ><CardContent>
    <Grid item container justifyContent='space-between' direction='column'>
     <Typography variant='h6' >Recette</Typography>
    <Typography variant='h5'>{Recette.recetteDeJour}</Typography> 
    </Grid>
    </CardContent> 
    </Grid>
    </Grid>
    <Divider />
    <EvolutionRecette evolution={Recette.evolution}/>
    </Card>}
</>
  )
}

export default Recette