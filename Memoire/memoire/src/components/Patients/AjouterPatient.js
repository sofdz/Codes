import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import validator from "validator";
//import moment from 'moment'

export default function AjouterPatient({ open, setOpen }) {

    const dateToString = function (date) {

        let day = date.getDate().toString()
        let temp = date.getMonth() + 1
        let month = temp.toString()
        let year = date.getFullYear().toString()
        let d = month.concat('-').concat(day).concat('-').concat(year)
        //let t = moment(d,"MM-DD-YYYY").toDate()
        return (d)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
      fetch(process.env.BACK+'/createPatient', {
            method: 'POST',
            body: JSON.stringify(patient),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then(res => console.log('patient créé :', res))
        })
    }

    const [patient, setPatient] = useState({
        nom: "",
        prenom: "",
        dateN: '2000-01-01',
        sexe:"Homme",
        adresse:"",
        telephone: ""
    })
    const [erreurDate,setErreurDate]=useState(false)
    const [erreurtel,setErreurtel]=useState(false)

    const handleChange = function (e) {
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
    return (
            <Dialog open={open} >
                        <form onSubmit={handleSubmit}>
                   <DialogTitle>
                   Ajouter un nouveau patient
                    </DialogTitle>
                    <DialogContent>
                    <TextField fullWidth required size='small' id="nom" name="nom" value={patient.nom} label='Nom' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px',alignSelf:'center' }} />
                            <TextField fullWidth required size='small' id="prenom" name="prenom" value={patient.prenom} label='Prénom' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px'}} />
                            <TextField fullWidth required error={erreurDate}  size='small' id="dateN" name="dateN" type="date" lang='fr-fr' value={patient.dateN} label={erreurDate?'date de naissance invalide(date<=date actelle et superieur á 1900)':'Date de naissance'}  variant="outlined" onChange={handleChangeDate} sx={{margin:'5px 0px' }} />
                            <TextField fullWidth  size='small' value={patient.adresse}   name="adresse"  lang="fr-FR"  label='Adresse' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px' }} />
                            <Select value={patient.sexe} name='sexe' onChange={handleChange} required  fullWidth>
                               <MenuItem value='Homme'>Homme</MenuItem>
                               <MenuItem value='femme'>Femme</MenuItem> 
                            </Select>
                            <TextField fullWidth required size='small' id="telephone" error={erreurtel} name="telephone"  type="tel" lang="fr-FR" value={patient.telephone} label={erreurtel?'Numero du telephone invalid(telephone au format:0666666666 ou +213666666666)':'Telephone'} variant='outlined' onChange={handleChangeTelephone} sx={{margin:'5px 0px' }} />
                        </DialogContent> 
                        <DialogActions>
                        <Button type="submit" disabled={erreurDate||erreurtel}><CheckIcon /></Button>
    <Button onClick={()=>{
    setPatient({
        nom: "",
        prenom: "",
        dateN: (dateToString(new Date(Date.now()))),
        telephone: ""
    }) ;setOpen(false);window.location.reload()}}><CloseIcon /></Button>
                        </DialogActions>
                        </form>
            </Dialog>
    )
}