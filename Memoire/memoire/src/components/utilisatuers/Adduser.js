import React, { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
function Adduser({open,setopen,usernames}) {
    console.log(usernames)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(erreurmdp||erreurUN){return}
        https://ophtaback.onrender.com+'/createUser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then(res =>{document.location.reload()})
        })
    }
    const [erreurmdp,seterreur]=useState(false)
    const [erreurUN,seterreurUN]=useState(false)
    const [user, setuser] = useState({
        nom: "",
        prenom: "",
        nom_utilisateur:"",
        MDP:"",
        role: "Assistante",
        telephone: ""
    })
   
    const [ MDPConfirmation,setmdpc]=useState("")
    useEffect(()=>{
        if(user.MDP!=MDPConfirmation){seterreur(true)}else{seterreur(false)}
        if(usernames.includes(user.nom_utilisateur)){(seterreurUN(true))}else{seterreurUN(false)}
    },[user.MDP,MDPConfirmation,user.nom_utilisateur])
    const handleChange = function (e) {
        console.log(e.target.value)
        setuser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
     const getlabel=()=>{
        if(erreurmdp){return 'Veillez confimer le mot de passe'}
        if(!MDPConfirmation.length){return 'confirmation de mot de passe'}
        return 'Mot de passe confirmé'
     }
    const handleconfiermerMDP=(e)=>{
    e.preventDefault()
    setmdpc(e.target.value)
 }
    return (
            <Dialog open={open} sx={{minWidth:"30%"}} >
                        <form onSubmit={handleSubmit}>
                   <DialogTitle>
                   Ajouter un nouvel utilisateur
                    </DialogTitle>
                    <DialogContent>
                    <TextField  fullWidth required size='small'  name="nom" value={user.nom} label='Nom' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px',alignSelf:'center' }} />
                    <TextField  fullWidth required size='small'  name="prenom" value={user.prenom} label='Prénom' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px'}} />
                    <TextField  fullWidth required size='small'  name="nom_utilisateur" error={erreurUN} value={user.nom_utilisateur} label={erreurUN?"ce nom d'utlisateur exise deja":"Nom utilisateur"} variant='outlined' onChange={handleChange} sx={{margin:'5px 0px'}} />
                    <TextField  fullWidth required size='small'  name="MDP" value={user.MDP} label='Mot de passe' type='password' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px'}} />
                    <TextField  fullWidth required size='small' type='password'   value={MDPConfirmation} label={getlabel()}   error={erreurmdp} color={!erreurmdp?'success':'error'}  variant='outlined' onChange={handleconfiermerMDP} sx={{margin:'5px 0px'}} />
                            <Select required value={user.role} fullWidth name='role' label='role' onChange={handleChange} sx={{margin:'5px 0px'}}>
                               <MenuItem value='Assistante'>Assistante</MenuItem>
                               <MenuItem value='Comptable'>Comptable</MenuItem> 
                               <MenuItem value='Medecin'>Medecin</MenuItem> 
                            </Select>
                            <TextField fullWidth  size='small'  name="telephone"  value={user.telephone} label='Téléphone' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px' }} />
                        </DialogContent> 
                        <DialogActions>
                        <Button type="submit" ><CheckIcon /></Button>
    <Button onClick={()=>{
    setuser({
        nom: "",
        prenom: "",
        nom_utilisateur:"",
        role: "Assistante",
        MDP:"",
        telephone:""
    }); setmdpc("");setopen(false)}}><CloseIcon /></Button>
                        </DialogActions>
                        </form>
            </Dialog>
    )
}

export default Adduser