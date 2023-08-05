import { useEffect, useState } from 'react'
import { Grid, TextField, Dialog, DialogTitle, Select, MenuItem, IconButton } from '@mui/material'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css';

//ICONS
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

export default function AddTemp({ open, setOpen,setTemplates }) {
    const [newTemp, setNewTemp] = useState({
        titre: '',
        type: 'Orientation',
        contenu: ''
    })
    const [type, setType] = useState('Orientation')
    const types = ['Orientation', 'Certificat', 'Compte rendu', 'Réponse']
    const [quill,setQuill] = useState({quill:null,quillRef:null})

    useEffect(()=>{
        console.log(newTemp.contenu)
        
    },[newTemp.titre,newTemp.type])

    const handleChange = (e)=>{
        setNewTemp((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit =  (e)=>{
        https://ophtaback.onrender.com+'/templates', {
            method: 'POST',
            body: JSON.stringify(newTemp),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then((res) => {console.log('template créé :', res);window.location.reload(false)})
        })  
    }

    return (
        <Dialog maxWidth='sm' fullWidth open={open} onClose={() => { setOpen(!open) }} m={1} PaperProps={{ sx: { height: 'inherit' } }} >
            <IconButton onClick={()=>{setOpen(false)}} sx={{position:'fixed', alignSelf:'flex-end'}}>
                <CloseIcon />
            </IconButton>
            <Grid container alignItems='center' flexDirection='column' wrap='nowrap' sx={{ height: '500px' }} spacing={2}>
                <Grid item position={'fixed'}>

                </Grid>
                <Grid item>
                    <DialogTitle> Nouveau template</DialogTitle>
                </Grid>
                <Grid item width='42%'>
                    <TextField onChange={handleChange} name='titre' fullWidth type='text' label='Titre du template'></TextField>
                </Grid>
                <Grid item width='100%' display='flex' justifyContent={'center'}>
                    <Select onChange={handleChange} name='type' sx={{ width: '40%' }} label='Type' value={newTemp.type} >
                        {types.map((type) => (<MenuItem value={type}>{type}</MenuItem>)

                        )}


                    </Select>
                </Grid>
                <Grid item xs={11} height='60%'>
                      <QuillComponent setQuill={setQuill} empty={quill.quill} setContent={setNewTemp} />  
                </Grid>
                <Grid item minHeight={'66px'}></Grid>
                <Grid item>
                    <IconButton type='submit' onClick={handleSubmit}>
                        <CheckIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Dialog>
    )
}

const QuillComponent = ({setContent})=>{
    const { quill,quillRef } = useQuill();
    useEffect(()=>{
        if(quill){
            quill.on('text-change',(a,b,c)=>{
                setContent((prev)=>({
                ...prev,
                contenu:quill.root.innerHTML
            }))
            console.log('done')
            })
            
        }
    },[quill,setContent])
    return(
        <>
            <div style={{height:'300px'}} ref={quillRef}></div>
        </>
    )
}