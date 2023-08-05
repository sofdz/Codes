import { Button, Card, CardActions, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
function AjoutAnteced() {
const [antecedent,setAntecd]=useState({designation:"",type:"Général"})  
const handlechange=(e)=>{
  e.preventDefault()
  setAntecd(prevs=>({...prevs,[e.target.name]:e.target.value}))
} 
const handleSubmit=(e)=>{
    e.preventDefault()
    fetch(process.env.BACK+'/createAntecedent', {
        method: 'POST',
        body: JSON.stringify(antecedent),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        res.json().then(res => console.log('antecedenet créé :', res))
        window.location.reload()

    })
}
  return (
    <Card className='cardantec' sx={{height:'100%',overflowY: 'scroll' }}>
        <form onSubmit={handleSubmit}>
    <CardContent> 
        <Typography variant='h5' color='primary'>Ajouter un antecedent:</Typography>
        <Grid container direction='row' alignContent='center' sx={{marginTop:'10px'}}>
        <Grid item xs={12} ><TextField size='small' fullWidth value={antecedent.designation} label='designation' name='designation' required onChange={handlechange}></TextField></Grid>
        <Grid item xs={12} sx={{marginTop:'8px'}} ><Select size='small' label='type' fullWidth required value={antecedent.type} name='type' onChange={handlechange}>
            <MenuItem  value='Général'>Général</MenuItem>
            <MenuItem value='Ophtalmologique'>Ophtalmologique</MenuItem>
        </Select></Grid>
       </Grid>
    </CardContent>
    <CardActions sx={{padding:0}}>
          <Button type='submit'><CheckIcon/></Button>
    </CardActions>
    </form>
    </Card>
  )
}
export default AjoutAnteced