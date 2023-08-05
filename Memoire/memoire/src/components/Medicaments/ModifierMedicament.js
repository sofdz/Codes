import { useState,useEffect } from "react"
import {Dialog,Typography,Grid,Button,IconButton,TextField, DialogContent, DialogTitle, DialogActions,} from '@mui/material'

//Icons
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'


export default function ModifierMedicament({setOpen,row }){
    const [medicament,setMedicament] = useState({
        designation:row.designation,
        posologie:row.posologie
    })
    const handleConfirmEdit = (e) => {
        e.preventDefault()
        fetch('https://ophtaback.onrender.com/medicaments/'.concat(row._id),{
            method:'PATCH',
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json ",

            },
            body:JSON.stringify(medicament)
        }).then((res)=>{res.json().then((data)=>{
            console.log(data)
            window.location.reload()
        })}).catch(e=>console.log('error',e))
    }

    const handleChange = (e)=>{
        setMedicament((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    return(
        
               <Dialog open>
                <DialogTitle>Modifier le médicament séléctionné:</DialogTitle>
                <form onSubmit={handleConfirmEdit}>
                <DialogContent>
                <TextField sx={{ marginTop:"10px"}} fullWidth required size='small' id="designation" name="designation" value={medicament.designation} label='Désignation' variant='outlined' onChange={handleChange}/>
                <TextField sx={{ marginTop:"10px"}} fullWidth required size='small' id="posologie" name="posologie" value={medicament.posologie} label='Posologie' variant='outlined' onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                <Button type="submit" ><CheckIcon /></Button>
                <Button onClick={()=>{
                 setOpen(false);window.location.reload()}}><CloseIcon /></Button>
                </DialogActions>
                </form>
               </Dialog> 
    )
    
}