import { useState, useEffect } from "react";
import {Typography, Button, Grid} from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import AjouterActe from "./AjouterActe";
import ModifierActe from "./ModifierActe";

//Icons
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import Deletee from "./delete";
const columns = [
    {
        field: 'nomActe',
        headerName: "Nom de l'acte",
        flex: 1,
        minWidth: 100,
        
    },
    {
        field: 'tarif',
        headerName: 'Tarif',
        type:'number',
        flex: 1,
        minWidth: 100,
    }
]

export default function Acte() {

    const [actes, setActes] = useState([])
    const [selected, setSelected] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        https://ophtaback.onrender.com+'/actes').then((res) => {
            res.json().then((data) => {
                setActes(data)
                console.log(data)
            }).catch(e=>{console.log(e)})
        })
    }, [])
    const handleConfirmDelete = () => {
        https://ophtaback.onrender.com+'/actes/', {
            method: 'DELETE',
            body: JSON.stringify(selected),
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(e => console.log(e)).catch(e => console.log(e))
    }

    return (
        <>
             <Typography variant="h3" color='primary'>Actes</Typography>

        {openAdd&&<AjouterActe  setOpen={setOpenAdd} />}
        {openEdit&&<ModifierActe  setOpen={setOpenEdit} row={actes.filter(acte=>acte._id==selected)[0]} />}
        {deleting&&<Grid><Deletee selected={selected} funct={setDeleting}  /></Grid>}                  
            <Grid container spacing={2}
            direction="column"
            justifyContent="center"
            alignItems='center'>
                <Grid container item direction='row' justifyContent="center" >
                <Grid item><Button onClick={() => setOpenAdd(true)}><AddIcon /></Button></Grid> 
                <Grid item><Button onClick={()=>setDeleting(true)}><DeleteIcon /></Button></Grid>
                {selected.length==1&&<Grid item><Button onClick={() => setOpenEdit(true)}><EditTwoToneIcon /></Button></Grid>}
                </Grid>
               <Grid item style={{width: '90%'}}>
               {actes.length?<DataGrid
                    rows={actes}
                    columns={columns}
                    hideFooter
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
                />:<h2>Aucun acte n'est trouvé</h2>}
                </Grid> 
            </Grid>
            </>
       )
}