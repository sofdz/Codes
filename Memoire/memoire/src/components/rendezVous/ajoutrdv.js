import React, {useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {Autocomplete} from "@mui/material";
import Message from "../utilisatuers/Message";


const Ajout= (props)=>{
    const [rdv,setrdv]=useState({date:"2025-10-01",motif:"",patient:props.patients[0].value})
    const [erreurDate,setErreurDate]=useState(false)
    const [msg,setmsg]=useState(null)
    const [openmsg,setopenmsg]=useState(false)
    const[value,setvalue]=useState(props.patients[0].value)
    const ajoutRdv=async (e)=>{
      e.preventDefault()
      if(value==null){return}
        try{
        const response=await fetch('/createRdv',{
        method:'POST',
        body: JSON.stringify(rdv),
        headers: {
        'Content-type': 'application/json; charset=UTF-8'
        }
      })
      const data=await response.json()
      setopenmsg(true)
      setmsg(data)
    }
catch(e){console.log(e)}
    } 
    const handleChangeDate=(e)=>{
      e.preventDefault()
      setrdv((prevs)=>({ ...prevs,date:e.target.value}))
        const date=new Date(e.target.value)
        if(date-Date.now()<0){
          setErreurDate(true)
        }
        else{        
          setErreurDate(false)
      }
     }   
    return(
<Dialog open={true}>
    <DialogTitle>AJOUTER UN RENDEZ-VOUS</DialogTitle>
    <form onSubmit={ajoutRdv}>
    <DialogContent>
        <TextField       sx={{ width: 300 }} defaultValue={rdv.date} error={erreurDate}  label={erreurDate?'date de naissance invalide(dateRdv>date actuelle)':'Date de rendez-vous'}
 type="date"   variant="outlined" onChange={handleChangeDate} ></TextField>
        <Autocomplete
      id="combo-box-demo"
      onChange={(event,newvalue)=>{
         setvalue(newvalue)
         if(newvalue==null){return}
        setrdv((prevs)=>{return { ...prevs,patient:newvalue.value}})
      }
    }
      defaultValue={props.patients[0]}
    options={props.patients}
      required
      sx={{ width: 300 ,marginTop:"10px"}}
      renderInput={(params) => <TextField {...params} label={value?"patient":"Vous devez choisir un patient"} variant="outlined" placeholder="choisisez un patient"  />}
         />
          <TextField  defaultValue={rdv.motif} onChange={(event)=>{    setrdv((prevs)=>{return { ...prevs,motif:event.target.value}})}} sx={{ width: 300,marginTop:"10px" }} label ="motif" variant="outlined"  ></TextField>
    </DialogContent>
    <DialogActions>
    <Button type="submit" disabled={erreurDate}><CheckIcon /></Button>
    <Button onClick={()=>{
    setrdv({date:"2002-10-01",motif:"",patient:props.patients[0].value}) ;props.funct(false);window.location.reload()}}><CloseIcon /></Button>
    </DialogActions>
    </form>
    {msg&&<Message open={openmsg} setopen={setopenmsg} contenu={msg.contenu} titre={msg.titre} type={msg.type}/>}
</Dialog>
    )
}
export default Ajout



