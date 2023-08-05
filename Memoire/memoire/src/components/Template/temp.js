import { useState, useEffect } from "react"
import { ToggleButton, Grid, IconButton, Switch, Typography, Select, MenuItem, TextField, FormLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import AddTemp from "./AddTemp";
//ICONS
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete'


export default function Temp() {
    const [templates, setTemplates] = useState([])
    const [type, setType] = useState('Orientation')
    const [selected, setSelected] = useState()
    const { quill, quillRef } = useQuill()
    const [openAdd, setOpenAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const types = ['Orientation', 'Certificat', 'Compte rendu', 'Réponse']
    const [searchValue, setSearchValue] = useState("")
    const [id, setId] = useState('')
    const columnsTemplates = [

        {
            field: 'titre',
            headerName: 'Titre du Template',
            width: 100,
            flex: 1,
        },
        {
            headerName: '',
            renderCell: (params) => (<>
                <IconButton onClick={() => {
                    const urlParams = {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                    }
                    https://ophtaback.onrender.com+'/templates/'.concat(params.row._id), urlParams).then(res => res.json().then((resp) => {
                        console.log(resp)
                        window.location.reload(false)
                    }))
                }} sx={{ color: 'red' }} disabled={!edit}>
                    <DeleteIcon />
                </IconButton>
            </>)
        }

    ]

    const filterModel = {
        items: [{ field: 'titre', operator: 'contains', value: searchValue }],
    }
    useEffect(() => {
        https://ophtaback.onrender.com+'/templates').then(res => res.json().then((data) => {
            setTemplates(data)
        })).catch((e) => console.log(e)).then(() => { })
        if (quill) { quill.enable(false) }
    }, [])

    const sauvegarderTemplate = (e) => {
        if (quill) {
            const urlParams = {
                method: 'PATCH',
                body: JSON.stringify({contenu:quill.root.innerHTML}),
                headers: {
                    "Content-Type": 'application/json'
                },
            }
            https://ophtaback.onrender.com+'/templates/'.concat(id),urlParams).then(res=>res.json().then((resp)=>{
                console.log(resp)
                window.location.reload(false)
            }))
        }

    }

    return (
        <>
            <AddTemp open={openAdd} setOpen={setOpenAdd} setTemplates={setTemplates} />
            <Grid container minHeight='500px' flexDirection='column' wrap='nowrap' justifyContent='flex-start' alignItems='center'>
                <Grid item container height='min-content' display={'flex'} flexDirection={'column'} flexWrap={'nowrap'} alignItems={'center'}>
                    <Grid item >
                        <Typography color='primary' variant='h3'>Templates d'ordonnances</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => {
                            setOpenAdd(true)
                            console.log(openAdd)
                        }}>
                            <AddIcon />
                        </IconButton>
                    </Grid>

                </Grid>
                <Grid container item xs={11} m='auto' display='flex' flexDirection='row' wrap='nowrap' minHeight='400px' spacing={2}>
                    <Grid container item xs={5} spacing={1}>
                        <Grid item xs={12} height='50px' display='flex' flexDirection='row' justifyContent='space-between'>
                            <FormLabel>Type :</FormLabel>
                            <Select label='Type' onChange={(e) => { setType(e.target.value) }} sx={{ height: '100%', width: '40%' }} value={type} >
                                {types.map((type) => (<MenuItem value={type}>{type}</MenuItem>)

                                )}


                            </Select>
                            <TextField size='small' label='Rechercher par titre' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }}> </TextField>
                        </Grid>
                        <Grid item xs={12} minHeight='300px'>
                            <DataGrid
                                getRowId={(row) => (row._id)}
                                columns={columnsTemplates}
                                rows={templates.filter(temp => (temp.type === type))}
                                // onRowSelectionModelChange={(items) => {
                                //     if (items.length === 0) {
                                //         setSelected([])
                                //     } else if (items.length === 1) {
                                //         setSelected(items)
                                //     } else {
                                //         setSelected([items[items.length - 1]])
                                //     }
                                // }}
                                disableMultipleRowSelection={true}
                                rowSelectionModel={selected}
                                //slots={{ toolbar: CustomToolbar }}
                                hideFooter
                                density="compact"
                                selectionMode="Single"
                                onRowDoubleClick={(params) => {
                                    { quill && quill.clipboard.dangerouslyPasteHTML(params.row.contenu) }
                                    setId(params.row._id)
                                }}
                                filterModel={filterModel}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item flexDirection={'column'} wrap='nowrap' spacing={2} width='43%'>
                        <Grid item container xs={11} flexDirection="row" flexWrap='nowrap' maxHeight={'70px'} alignItems={'center'}>
                            <Grid item xs={11} minHeight={'50px'} maxHeight='70px' display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center'>
                                <Typography variant='body1'>Modification</Typography>
                                <Switch value={edit} onChange={() => { setEdit(!edit) }} />
                            </Grid>
                            <Grid item>
                                <IconButton color="primary" disabled={!edit} onClick={sauvegarderTemplate}><SaveIcon /></IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} width='100%'>
                            <div ref={quillRef} style={{ height: '79%' }}>
                                {quill ? quill.enable(edit) : console.log('noQuill')}

                            </div>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )

}