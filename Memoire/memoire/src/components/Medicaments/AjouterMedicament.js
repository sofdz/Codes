import React from "react";
import { Dialog, Button,TextField,DialogTitle, DialogContent,DialogActions } from '@mui/material'
import { useState } from "react";

//Icons
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

export default function AjouterMedicament({ open, setOpen }) {
    const [medicament, setMedicament] = useState({
        designation: "",
        posologie: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://ophtaback.onrender.com/medicaments', {
            method: 'POST',
            body: JSON.stringify(medicament),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then(res => console.log('médicament créé :', res))
            window.location.reload()

        })
    }

    const handleChange = function (e) {
        console.log(e.target.value)
        setMedicament((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
      
            <Dialog open={open} PaperProps={{sx:{maxWidth:'350px'}}} >
                <DialogTitle>Ajouter un nouveau médicament</DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                           <TextField sx={{ width: 300 ,marginTop:"10px"}} required   name="designation" value={medicament.designation} label='Désignation' variant='outlined' onChange={handleChange} />
                           <TextField sx={{ width: 300 ,marginTop:"10px"}} required  name="posologie" value={medicament.posologie} label='Posologie' variant='outlined' onChange={handleChange}  />                    
                </DialogContent>
                <DialogActions>
                             <Button type="submit" ><CheckIcon /></Button>
                             <Button onClick={()=>{
                                setMedicament({
                                    designation: "",
                                    posologie: ""
                                })
                               setOpen(false);window.location.reload()}}><CloseIcon /></Button>
                              </DialogActions> 
                </form>
            </Dialog>
    )

}