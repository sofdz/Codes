import React, { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import {FormControlLabel} from '@mui/material';
import {Checkbox} from '@mui/material';
import Message from './Message';
function ModifierUser({userM,setopen,usernames}) {
    console.log(usernames)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(erreurmdp||erreurUN){return}
        if(!modifMDP){delete user.MDP}
        fetch(process.env.BACK+'/updateUser/'.concat(userM._id), {
            method: 'PATCH',
            body: JSON.stringify({user,mdpAdmin}),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then(mes =>{setMessage(mes);setsend(true)})
        })
    }
    const [erreurmdp,seterreur]=useState(false)
    const [erreurUN,seterreurUN]=useState(false)
    const [user, setuser] = useState({
        nom: userM.nom,
        prenom:userM.prenom,
        MDP:"",
        nom_utilisateur:userM.nom_utilisateur,
        telephone:userM.telephone
    })
    const[mdpAdmin,setmdpAdmin]=useState("")
    const [modifMDP,setModifMDP]=useState(false)
    const [message,setMessage]=useState({})
    const [send,setsend]=useState(false)
    const [MDPConfirmation,setmdpc]=useState("")
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
            <Dialog open={true} sx={{minWidth:"30%"}} >
                        <form onSubmit={handleSubmit}>
                   <DialogTitle>
                   Modifier un nouvel utilisateur
                    </DialogTitle>
                    <DialogContent>
                    <TextField  fullWidth required size='small'  name="nom" value={user.nom} label='Nom' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px',alignSelf:'center' }} />
                    <TextField  fullWidth required size='small'  name="prenom" value={user.prenom} label='Prénom' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px'}} />
                    <TextField  fullWidth required size='small'  name="nom_utilisateur" error={erreurUN} value={user.nom_utilisateur} label={erreurUN?"ce nom d'utlisateur exise deja":"Nom utilisateur"} variant='outlined' onChange={handleChange} sx={{margin:'5px 0px'}} />
                    
                    <TextField  fullWidth disabled size='small'   value={userM.role} label='role' variant='outlined' sx={{margin:'5px 0px'}} />
                            <TextField fullWidth  size='small'  name="telephone"  value={user.telephone} label='Téléphone' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px' }} />
                            <FormControlLabel control={<Checkbox  checked={modifMDP} onChange={()=>{setModifMDP(prevs=>!prevs)}} />} label={modifMDP?'modification mot de passe activée':'modification mot de passe désactivée'}  />
                            {modifMDP&&<Paper elevation={5} sx={{backgroundColor:'#eee4ee'}}>
                                <TextField  fullWidth required size='small'  name="MDP" value={user.MDP} label='Mot de passe' type='password' variant='outlined' onChange={handleChange} sx={{margin:'5px 0px'}} />
                    <TextField  fullWidth required size='small' type='password'   value={MDPConfirmation} label={getlabel()}   error={erreurmdp} color={!erreurmdp?'success':'error'}  variant='outlined' onChange={handleconfiermerMDP} sx={{margin:'5px 0px'}} />
                  </Paper> }
                        </DialogContent> 
                        <DialogActions>
                            <Grid container direction='row' justifyContent='space-between' justifyItems='center'>
                           <Grid item> <TextField fullWidth  size='large' type='password' required   value={mdpAdmin} label='Mot de passe Admin' variant='outlined' onChange={(e)=>{e.preventDefault();setmdpAdmin(e.target.value)}} sx={{margin:'5px 0px' }} /></Grid>
                           <Grid item>
                        <Button type="submit"><CheckIcon /></Button>
    <Button onClick={()=>{
    setuser({
        nom: "",
        prenom: "",
        nom_utilisateur:"",
        MDP:"",
        telephone:""
    }); setmdpc("");setopen(false)}}><CloseIcon /></Button>
    </Grid>
      </Grid>
                        </DialogActions>
                        </form>
                        <Message open={send} setopen={setsend} titre={message.titre} type={message.type} contenu={message.contenu}/>
            </Dialog>
    )
}
export default ModifierUser