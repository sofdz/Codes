import React, {useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {Autocomplete} from "@mui/material";
import Message from "../utilisatuers/Message";


const Modif= (props)=>{
    const pat=props.patients.filter(pat=>pat.value==props.row.patient._id)[0]
    var date=new Date(props.row.date)
    var month=date.getMonth()+1
    var Datee=date.getDate()
    if(month<10){month=`0${month}`}
    if(Datee<10){Datee=`0${Datee}`}
    date=`${date.getFullYear()}-${month}-${Datee}`
    const [rdv,setrdv]=useState({date:date,motif:props.row.motif,patient:pat.value})
    const[value,setvalue]=useState(pat.value)
    const [erreurDate,setErreurDate]=useState(false)
    const [msg,setmsg]=useState(null)
    const [openmsg,setopenmsg]=useState(false)
    const ModifieRdv=async (e)=>{
        e.preventDefault()
        try{
        const response=await fetch('https://ophtaback.onrender.com/updateRdv/'+props.row._id,{
        method:'PATCH',
        body: JSON.stringify(rdv),
        headers: {
        'Content-type': 'application/json; charset=UTF-8'
        }
      })
      const data=await response.json()
      console.log(data)
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
    <DialogTitle>modifier le RENDEZ-VOUS selectionné</DialogTitle>
    <form onSubmit={ModifieRdv}>
    <DialogContent>
        <TextField sx={{ width: 300 }} defaultValue={rdv.date} error={erreurDate}  label={erreurDate?'date de rendez vous invalide(dateRdv>date actuelle)':'Date de rendez-vous'}
 type="date"  variant="outlined" onChange={handleChangeDate} ></TextField>
        <Autocomplete
      id="combo-box-demo"
      disabled
      defaultValue={pat}
    options={props.patients}
      required
      sx={{ width: 300 ,marginTop:"10px"}}
      renderInput={(params) => <TextField {...params} label={value?"patient":"Vous devez choisir un patient"} variant="outlined" placeholder="choisisez un patient"  />}
         />
          <TextField  defaultValue={rdv.motif}  onChange={event=>{
setrdv((prevs)=>{return { ...prevs,date:event.target.value}})
  }} sx={{ width: 300,marginTop:"10px" }} label ="motif" variant="outlined"  ></TextField>
    </DialogContent>
    <DialogActions>
    <Button type="submit" disabled={erreurDate} ><CheckIcon /></Button>
    <Button onClick={()=>{
    props.funct(false);window.location.reload()}}><CloseIcon /></Button>
    </DialogActions>
    </form>
    {msg&&<Message open={openmsg} setopen={setopenmsg} contenu={msg.contenu} titre={msg.titre} type={msg.type}/>}
</Dialog>
    )
    }
export default Modif
