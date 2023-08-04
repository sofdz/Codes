import { useState, useEffect } from "react"
import { Dialog,  Button, TextField,DialogActions,DialogTitle,DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
export default function ModifierActe({ setOpen,row}) {
    const [acte, setActe] = useState({
        nomActe: row.nomActe,
        tarif: row.tarif
    })
    const handleConfirmEdit = (e) => {
        e.preventDefault()
        fetch('/actes/'.concat(row._id), {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json ",
            },
            body: JSON.stringify(acte)
        }).then((res) => {
            res.json().then((data) => {
                window.location.reload()
            })
        }).catch(e => console.log('error', e))
    }
    const handleChange = (e) => {
        setActe((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    return (
       
           <Dialog open PaperProps={{sx:{maxWidth:'350px'}}}>
                <DialogTitle>
                Modifier l'acte sélectionné:
                </DialogTitle>
                <form onSubmit={handleConfirmEdit}>
                <DialogContent>
                <TextField required sx={{ width: 300 ,marginTop:"10px"}} size='small'  name="nomActe" value={acte.nomActe} label="Nom de l'acte" variant='outlined' onChange={handleChange}  />
                <TextField required sx={{ width: 300 ,marginTop:"10px"}}  type='number' size='small' value={acte.tarif} name="tarif"  label='Tarif' variant='outlined' onChange={handleChange}  />
                </DialogContent>
                <DialogActions>
                <Button type="submit" ><CheckIcon /></Button>
                             <Button onClick={()=>{setOpen(false);window.location.reload()}}><CloseIcon /></Button>
                </DialogActions>
                </form>
            </Dialog>
        
    )    
}