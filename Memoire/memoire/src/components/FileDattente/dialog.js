import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,TextField, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import Select from '@mui/material/Select';
import {Autocomplete} from '@mui/material';

const Diag = (props) => {

 
    const [patients,setpatients]=useState(null)
    const [isopen,setisopen]=useState(false)
    const[value,setvalue]=useState(null)
    const handleChange = (event, newValue) => {
          event.preventDefault()
          console.log(newValue)
          setvalue(newValue)      };
      const addPatient=(event)=>
      {
        event.preventDefault()
        if(!value){return}
        const dataa=[]
        console.log(value)
        props.patients.map(patient=>{dataa.push(patient._id)})
           dataa.push(value.value)
        fetch('/updatefile',{
  method:'PATCH',
  body: JSON.stringify(dataa),
  headers: {
  'Content-type': 'application/json; charset=UTF-8'
  }
}).then(result=>{window.location.reload()}).catch(error=>{console.log(error)})
        setisopen(false)
      }
    useEffect(
        ()=>{
          fetch('/patientsNotInFile').then(response=>response.json().then(data=>{
          const tab=[]  
          data.map(patient=>{
            const object={label:patient.nom+" "+patient.prenom,value:patient._id}
            tab.push(object)
          })
          setvalue(tab[0])
          setpatients(tab)
          }))
       },[])
       const viderfile=()=>{
        fetch('/updatefile',{
          method:'PATCH',
          body: JSON.stringify([]),
          headers: {
          'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(result=>{window.location.reload()}).catch(error=>{console.log(error)})
       }
       const chargerrdvs=()=>{
        fetch('/chargerRdvs',{
          method:'PATCH',
          body: JSON.stringify(),
          headers: {
          'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(result=>{window.location.reload()}).catch(error=>{console.log(error)})
       }
  return (
    <div>
      <Grid container direction='row' alignContent='space-between'  spacing={10} >
      <Grid item><Button style={{fontSize:"15px"}} onClick={()=>{setisopen(true)}}><Add />  ajouter patient a la file</Button></Grid>
      <Grid item><Button disabled={props.patients.length!=0} style={{fontSize:"15px"}} onClick={chargerrdvs}> Charger Rendez-Vous </Button></Grid>
      <Grid item><Button disabled={props.patients.length==0} style={{fontSize:"15px"}} onClick={viderfile}> vider la file d'attente </Button></Grid>

     </Grid>
    <form>
<Dialog open={isopen} maxWidth='lg' style={{minHeight:"100px"}}>
    {!patients?<div><DialogTitle>y a pas des nouveaux patients a ajouter dans la file</DialogTitle><DialogActions>
          <Button onClick={()=>{setisopen(false)}}><CloseIcon /></Button>
        </DialogActions></div>:<div><DialogContent>
         <DialogContentText></DialogContentText>
         <Autocomplete
      id="combo-box-demo"
      options={patients}
      onChange={handleChange}
      defaultValue={patients[0]}
      required
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={value==null?"vous devez selectionné un patient":"patient"} variant="outlined" placeholder="choisisez un patient"  />}
    />
          </DialogContent>
          <DialogActions>
          <Button type='submit' onClick={addPatient}><CheckIcon /></Button>
          <Button onClick={()=>{setisopen(false)}}><CloseIcon /></Button>
        </DialogActions>
        </div>
}

</Dialog>
</form>
</div>
    );
}

export default Diag;