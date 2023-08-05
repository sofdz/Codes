import React, { useEffect, useState } from "react"
import { Box, IconButton,Typography,Grid,Button,Dialog, Container } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid"
import SupprimerMedicament from './SupprimerMedicament'
import AjouterMedicament from "./AjouterMedicament"
import ModifierMedicament from "./ModifierMedicament"
//Icons
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import Deletee from "./delete"
const columns = [
    {
        field: 'designation',
        headerName: 'Désignation',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'posologie',
        headerName: 'Posologie',
        flex: 1,
        minWidth: 100,
    }
]
export default function Medicamenet() {
    const [medicaments, setMedicaments] = useState([])
    const [selected, setSelected] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        https://ophtaback.onrender.com+'/medicaments').then((res) => {
            res.json().then((data) => {
                setMedicaments(data)
            })
        })
    }, [])
    return (
           <>
               <Typography variant="h3" color='primary'>Médicaments</Typography>

           <AjouterMedicament open={openAdd} setOpen={setOpenAdd}/>
{openEdit&&<ModifierMedicament setOpen={setOpenEdit} row={medicaments.filter(med=>med._id==selected)[0]} />}
{deleting&&<Deletee selected={selected} funct={setDeleting}/>}
           <Grid container spacing={2}
	direction="column"
    alignContent='center'
    alignItems='center'>
                <Grid item container direction="row" justifyContent="center">
                   <Grid item><Button onClick={() => setOpenAdd(true)}>
                <AddIcon />
            </Button></Grid> 
                   <Grid item><Button onClick={()=>{setDeleting(true)}}>
                <DeleteIcon />
            </Button></Grid> 
            {selected.length==1?  <Grid item><Button onClick={() => setOpenEdit(true)}>
                <EditTwoToneIcon />           </Button></Grid> :null} 
            </Grid> 
              
         <Grid item style={{width: '90%'}}>
            {medicaments.length?
         <DataGrid
                    rows={medicaments}
                    hideFooter

                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(items) => { setSelected(items) }}
                />:<h2>Aucun médicament n'est trouvé</h2>}
         </Grid> 
         </Grid>
            </> 
      
    )
}