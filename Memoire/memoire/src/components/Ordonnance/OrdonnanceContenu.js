import { useState, useEffect } from "react";
import { Grid, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css';

//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DoneIcon from '@mui/icons-material/Done'

const columns = [
    {
        field: 'titre',
        headername: 'Titre',
        flex: 1,
        width: 200
    }
]



export default function OrdonnanceContenu({ordonnance,setOrdonnance}) {
    const [templates, setTemplates] = useState([])
    const { quill, quillRef } = useQuill()
    const [selected, setSelected] = useState([])
    useEffect(() => {
        if (quill) {
            quill.on('text-change', (newText, oldText, source) => {
                setOrdonnance((previousOrdonnance)=>({
                    ...previousOrdonnance,
                    contenu:quill.root.innerHTML
                }))
            })
        }
    }, [quill,setOrdonnance])

    useEffect(()=>{
        if(['Orientation', 'Certificat', 'Réponse', 'Compte rendu'].includes(ordonnance.type) && quill && quill.root.innerHTML !== ordonnance.contenu){
            quill.clipboard.dangerouslyPasteHTML(ordonnance.contenu)
        }
    },[quill,ordonnance._id])

    useEffect(()=>{
        https://ophtaback.onrender.com+'/templates').then(res=>res.json().then((data)=>{
            setTemplates(data)
        })).catch((e)=>console.log(e))
    },[])
    return (
        <>
            <Grid container spacing={1} m={1} display='flex' flexDirection='row' justifyContent='space-between'>
                <Grid item xs={5.5}>
                    <Paper sx={{ width: '100%', height: '100%' }} elevation={2}>
                        <div ref={quillRef} style={{height:'83.5%'}}>

                        </div>


                    </Paper>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={(e) => {
                        quill.clipboard.dangerouslyPasteHTML(templates.find(t => t.id === selected[0]).contenu)
                    }}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>

                <Grid container item xs={5.5} spacing={1} >
                    <Grid item xs={12}>
                        <DataGrid
                            getRowId={(row) => (row._id)}
                            columns={columns}
                            rows={templates.filter(t=>t.type===ordonnance.type)}
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(items) => {
                                if (items.length === 0) {
                                    setSelected([])
                                } else if (items.length === 1) {
                                    setSelected(items)
                                } else {
                                    setSelected([items[items.length - 1]])
                                }
                            }}
                            disableMultipleRowSelection={true}
                            rowSelectionModel={selected}
                            //slots={{ toolbar: CustomToolbar }}
                            hideFooter
                            density="compact"
                            selectionMode="Single"
                        />

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}