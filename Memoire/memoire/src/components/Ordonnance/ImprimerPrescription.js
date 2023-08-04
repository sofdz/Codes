import {useRef} from 'react'
import ReactToPrint from 'react-to-print'
import {Dialog,Grid,Typography,Button,IconButton,Divider} from '@mui/material'
import { DataGrid,GridToolbarContainer } from '@mui/x-data-grid'
import moment from 'moment'
//icons
import CloseIcon from '@mui/icons-material/Close'
//
import header from './../../images/header.jpg'
import footer from './../../images/footer.jpg'
function CustomToolbar2() {
    <GridToolbarContainer></GridToolbarContainer>
}

const columns = [
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


export default function ImprimerPrescription({printing,setPrinting,ordonnance}){
    const componentRef = useRef()

    

    return(
        <>
            <Dialog open={printing} onClose={()=>{setPrinting(false)}}>
                <Grid container display='grid' flexWrap='nowrap' flexDirection='column' >
                    <Grid item xs={2}>
                        <IconButton onClick={(e) => { setPrinting(false) }}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <ReactToPrint trigger={() => <Button>Imprimer</Button>} content={() => componentRef.current} />
                    </Grid>
                    <Grid container item xs={12} rowSpacing={2} display='flex' alignContent='flex-start' sx={{ '& .MuiGrid-root':{
                        display:'flex',
                    },width:'580px', height:'675px' }} ref={componentRef}>
                        <Grid item xs={12}>
                            <img
                                alt=''
                                src={header}
                            />
                        </Grid>

                        <Grid item xs={12}><Divider color="black" variant="middle" /></Grid>
                        <Grid item xs={12} justifyContent='center' display='grid'>
                            <Typography variant="h6" >Préscription</Typography>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='row' justifyContent='flex-start' justifySelf='flex-start' >
                            <Typography fullWidth marginLeft={4.5} align='center' color='black' variant='body2'> Nom et prénom : {ordonnance.patient.nom} {ordonnance.patient.prenom}</Typography>
                        
                            <Typography fullWidth marginRight={4.5} align='center' color='black' variant='body2'> Le {moment(Date.now()).format('DD/MM/YYYY')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DataGrid

                                getRowId={(row) => (row.medicament._id)}
                                columns={columns}
                                rows={ordonnance.medicaments}
                                columnHeaderHeight={0}
                                disableRowSelectionOnClick
                                slots={{ toolbar: CustomToolbar2 }}
                                hideFooter
                                density="compact"
                                //experimentalFeatures={{ newEditingApi: true }}
                                sx={{
                                    '& .MuiCheckbox-root': {
                                        color: 'white',
                                    },
                                    '& .MuiDataGrid-withBorderColor': {
                                        borderColor: 'white',
                                    },

                                    maxWidth: '600px',
                                }}


                            />
                        </Grid>
                        <Grid item xs={12} justifySelf='flex-end' bottom={1} position='absolute' >
                            <img
                                alt=''
                                src={footer}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}