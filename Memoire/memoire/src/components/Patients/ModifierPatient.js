import React, { useEffect, useState } from "react";
import { Dialog, Typography, Grid, Button, TextField, Alert, IconButton, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import moment from 'moment'
import validator from "validator";
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'


export default function ModifierPatient({setOpen,row }) {
    var date=new Date(row.dateN)
    date=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const [patient, setPatient] = useState({
        nom: row.nom,
        prenom: row.prenom,
        dateN: date,
        telephone:row.telephone,
    })
    const [erreurDate,setErreurDate]=useState(false)
    const [erreurtel,setErreurtel]=useState(false)
    const handleChange = (e) => {
        setPatient((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleChangeDate=(e)=>{
        e.preventDefault()
        setPatient((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
          const date=new Date(e.target.value)
          if(date-Date.now()>0||parseInt(e.target.value.substring(0,4))<1900){
            setErreurDate(true)
          }
          else{        
            setErreurDate(false)
        }
       }
       const handleChangeTelephone=(e)=>{
        e.preventDefault()
        setPatient((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        if(!validator.isMobilePhone(e.target.value,'ar-DZ')){setErreurtel(true)}else{setErreurtel(false)}
       }
    const handleConfirmEdit = (e) => {
        e.preventDefault()
        fetch(process.env.BACK+'/Patients/'.concat(row._id), {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
                },
            body: JSON.stringify(patient)
        }).then((res) => { window.location.reload() }).catch(e => console.log('error', e))
    }
    return (
                       <Dialog open>
                            <DialogTitle>
                            Modification du patient séléctionné:
                            </DialogTitle>
                            <form onSubmit={handleConfirmEdit}>
                                <DialogContent>
                            <TextField  sx={{ marginTop:"10px"}} required  fullWidth size="small" id="nom" name="nom" value={patient.nom} label='Nom' variant='outlined' onChange={handleChange}/>
                            <TextField  sx={{ marginTop:"10px"}} required  fullWidth size="small" id="prenom" name="prenom" value={patient.prenom} label='Prénom' variant='outlined' onChange={handleChange}  />
                            <TextField  sx={{ marginTop:"10px"}} required  fullWidth size="small" id="dateN" name="dateN" error={erreurDate} label={erreurDate?'date de naissance invalide(date<=date actelle et superieur á 1900)':'Date de naissance'} type="date" lang='fr-fr' value={patient.dateN}  variant="outlined" onChange={handleChangeDate}  />
                            <TextField  sx={{ marginTop:"10px"}} required  fullWidth size="small" id="telephone" name="telephone" error={erreurtel} type="tel" lang="fr-FR" value={patient.telephone}  variant='outlined' onChange={handleChangeTelephone}   label={erreurtel?'Numero du telephone invalid(telephone au format:0666666666 ou +213666666666)':'Telephone'} />
                                </DialogContent>
                                <DialogActions>
                                <Button type="submit" disabled={erreurDate||erreurtel}><CheckIcon /></Button>
    <Button onClick={()=>{
    setOpen(false);window.location.reload()}}><CloseIcon /></Button>
                                </DialogActions>
                            </form>
                        </Dialog>
            
           
        )
}