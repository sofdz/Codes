import { DataGrid,GridToolbarContainer,GridToolbarFilterButton } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Grid, Paper,IconButton } from "@mui/material";

//icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const medicamentsColumns = [
    {
        field: 'designation',
        headerName: 'Désignation',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'posologie',
        headerName: 'Posologie par défaut',
        flex: 1,
        minWidth: 100,
    }
]
const medicamentsOrdColumns = [
    {
        field: 'medicament',
        headerName: 'Désignation',
        flex: 1,
        minWidth: 100,
        renderCell: (params) => {
            return (params.row.medicament.designation)
        }
    },
    {
        field: 'posologie',
        headerName: 'Posologie',
        flex: 1,
        minWidth: 100,
        editable: true,

    }
]
export default function Prescription({ ordonnance,setOrdonnance}) {
    const [selectedMed,setSelectedMed] = useState([])
    const [selectedOrd,setSelectedOrd] = useState([])
    const [medicaments,setMedicaments] = useState([])
    useEffect(()=>{
        fetch('/medicaments').then(res => res.json().then((data) => {
            setMedicaments(data)
        })).catch(e => console.log('impossible de trouver les médicaments', e))
    },[])
    
    const handleAdd = (e) => {
        const temp = []
        ordonnance.medicaments.map((m) => temp.push(m))
        medicaments.filter((med) => (selectedMed.includes(med._id))).forEach((m) => {
            temp.push({
                medicament: m,
                posologie: m.posologie
            })
        })

        setOrdonnance((previousOrdonnance) => ({
            ...previousOrdonnance,
            medicaments: temp,
        }))

    }

    const handleRemove = (e) => {
        let temp = [...ordonnance.medicaments]
        temp = temp.filter(t => !selectedOrd.includes(t.medicament._id))


        setOrdonnance((previousOrdonnance) => ({
            ...previousOrdonnance,
            medicaments: temp,
        }))

    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        );
    }

    const handleRowUpdate = (newRow, oldRow) => {
        const temp = [...ordonnance.medicaments]
        const temp2 = []
        temp.map((med,index) => {
            if(med._id === newRow._id){

                let x ={
                    medicament:med.medicament,
                    posologie:newRow.posologie
                }
                
                temp2.push(x)
            }else{temp2.push(med)}
            
        }) 
        setOrdonnance((previousOrdonnance) => ({
            ...previousOrdonnance,
            medicaments: temp2
        }

        ))
    }

    return (
        <>
            <Grid container spacing={1} m={1}>
                <Grid item xs={5.5}>
                    <Paper sx={{ width: '100%', height: '100%' }} elevation={2}>
                    
                        <DataGrid
                            getRowId={(row) => {
                                return(row.medicament._id)
                            }}
                            rowCount={ordonnance.medicaments.length}
                            columns={medicamentsOrdColumns}
                            rows={ordonnance.medicaments}
                            editMode="row"
                            processRowUpdate={handleRowUpdate}
                            checkboxSelection
                            //columnHeaderHeight={0}
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(items) => { setSelectedOrd(items) }}
                            //slots={{ toolbar: CustomToolbar2 }}
                            hideFooter
                            density="compact"
                            experimentalFeatures={{ newEditingApi: true }}
                            // sx={{
                            //     '& .MuiCheckbox-root': {
                            //         color: 'white',
                            //     },
                            //     '& .MuiDataGrid-withBorderColor': {
                            //         borderColor: 'white',
                            //     },
                            // }}


                        />
                    </Paper>
                </Grid>
                <Grid item xs={1} display='flex' flexDirection='column' justifyContent='center'>
                    <IconButton onClick={handleRemove}><ArrowForwardIosIcon /></IconButton>
                    <IconButton onClick={handleAdd}><ArrowBackIosNewIcon/></IconButton>
                </Grid>
                <Grid container item xs={5.5} spacing={1} >
                    <Grid item xs={12}>
                        <DataGrid
                            getRowId={(row) => (row._id)}
                            rowCount={medicaments.length}
                            columns={medicamentsColumns}
                            rows={medicaments.filter((m) => {
                                let t = true
                                ordonnance.medicaments.forEach((med) => {
                                    if (m._id === med.medicament._id) { t = false }
                                })
                                return t

                            })}
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(items) => { setSelectedMed(items) }}
                            slots={{ toolbar: CustomToolbar }}
                            hideFooter
                            density="compact"
                        />

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}