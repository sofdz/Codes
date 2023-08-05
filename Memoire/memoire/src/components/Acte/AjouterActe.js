import { Dialog, Grid, IconButton,FormControl,TextField,Button,FormLabel, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useState } from 'react'
//icons
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'


export default function AjouterActe({setOpen}) {
    const [acte, setActe] = useState({
        nomActe: "",
        tarif: 0
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        https://ophtaback.onrender.com+'/actes', {
            method: 'POST',
            body: JSON.stringify(acte),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then(res => console.log('acte créé :', res))
            window.location.reload()

        })
    }

    const handleChange = function (e) {
        setActe((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    return (                
            <Dialog open PaperProps={{sx:{maxWidth:'350px'}}}>
                <DialogTitle>
                Ajouter un nouvel acte
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                <TextField required sx={{ width: 300 ,marginTop:"10px"}} size='small'  name="nomActe" label="Nom de l'acte" variant='outlined' onChange={handleChange}  />
                <TextField required sx={{ width: 300 ,marginTop:"10px"}}  type='number' size='small' name="tarif"  label='Tarif' variant='outlined' onChange={handleChange}  />
                </DialogContent>
                <DialogActions>
                <Button type="submit" ><CheckIcon /></Button>
                             <Button onClick={()=>{
                                setActe({
                                    nomActe:"",
                                    tarif:0
                                })
                               setOpen(false);window.location.reload()}}><CloseIcon /></Button>
                </DialogActions>
                </form>
            </Dialog>
        )
}