import { Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel,Checkbox,Grid,FormGroup,Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'

function AjouterActes({open_acte,setOpen_acte,actConsult,setActesConsult,etat}) {
    const [actes,setActes]=useState()
    const [selected,setSelected]=useState(actConsult)
    useEffect(
        ()=>{
            fetch('https://ophtaback.onrender.com/actesss').then(res=>{res.json().then(data=>{setActes(data)})})
        }
        ,[])
    const handleChange=(e)=>{
        e.preventDefault()
        if(!e.target.checked){
         setSelected(prevs=>(prevs.filter(element=>element!=e.target.value)))
        } 
         else{
         setSelected(prevs=>([...prevs,e.target.value]))
         }
    }
  return (
     <Dialog open={open_acte} onClose={()=>{setActesConsult(selected);setOpen_acte(false)}}>
        <DialogTitle><Typography variant='h5'>Choisissez les actes de cette consultation:</Typography></DialogTitle>
        {etat=="Payé"&&
        <Typography variant='h6' sx={{color:'red'}}>cette consultation est déja payée vous n'avez pas le droit de modifier les actes!!</Typography>}
        <DialogContent>
            <Grid container direction='row' spacing={3} justifyContent='center' justifyItems='center'  >
            {actes&&actes.map(acte=>(
                    <Grid item xs={4} key={acte._id}>
                        <FormGroup>
                        <FormControlLabel control={<Checkbox disabled={etat=="Payé"} checked={selected.includes(acte._id)} onChange={handleChange} />} label={acte.nomActe+' // '+acte.tarif}  value={acte._id} />
                        </FormGroup>
                    </Grid>
                ))}
            </Grid>
            </DialogContent> 
        <DialogActions>
        <Button onClick={()=>{setActesConsult(selected);console.log(selected);setOpen_acte(false)}}><CloseIcon /></Button>
            </DialogActions> 
    </Dialog>
  )
}

export default AjouterActes