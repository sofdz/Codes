import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography,Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import React from 'react'

function Payer({open,setopen,reglement}) {
  var dateDuJour=new Date()
  dateDuJour=`${dateDuJour.getMonth()+1}-${dateDuJour.getDate()}-${dateDuJour.getFullYear()}Z`
  
  console.log((dateDuJour))
    const payyer=(e)=>{
        e.preventDefault()
        https://ophtaback.onrender.com+'/Payer/'.concat(reglement._id), {
            method: 'PATCH',
            body:JSON.stringify({dateDuJour:dateDuJour}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
                },
        }).then((res) => { }).catch(e => console.log('error', e))
    }
  return (
    <>
    {reglement&&
    <Dialog open={open} onClose={()=>{setopen(false)}}>
      <DialogTitle><Typography variant='h5'>Confirmer le paiement du ce reglement: </Typography></DialogTitle>
      <DialogContent>
      <Grid container  direction='column' justifyContent='center' justifyItems='center'>
        <Grid item  ><Typography variant='h6' >patient:{reglement.consult.patient.nom+" "+reglement.consult.patient.prenom} </Typography></Grid>
        <Grid item   ><Typography variant='h6' >Numero consultation:{reglement.consult.num_consult}</Typography></Grid>
        <Grid item ><Typography variant='h5' >Montant:{reglement.montant} </Typography></Grid>
      </Grid>
      </DialogContent>
      <DialogActions>
      <Button onClick={payyer}><CheckIcon /></Button>
                             <Button onClick={()=>{setopen(false)}}><CloseIcon /></Button>
      </DialogActions>
    </Dialog>
}
</>
  )
}

export default Payer