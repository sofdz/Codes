import { useEffect, useRef, useState } from 'react'
import { Dialog, Grid, IconButton, Paper, Stack, TextField, Typography, } from '@mui/material'
import {
    DataGrid, GridToolbarFilterButton, GridToolbarContainer
} from '@mui/x-data-grid'
//Icons
import AddIcon from '@mui/icons-material/Add'
import {Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; 
import { useLocation } from 'react-router-dom'
import Consultation from '../Consultation/Consultations'
import AfficherListeConsult from '../Consultation/AfficherListeConsult'
import AntecedMed from '../antecedents.js/AntecedMed'
import AjoutAnteced from '../antecedents.js/AjoutAnteced'
import AntecedPat from '../antecedents.js/AntecedPat'
import PiecesJointes from './PiecesJointes'
const tests = [{id:0,contenu:'jfsdkbete'},{ id: 1, contenu: 'diabete' }, { id: 2, contenu: 'hta' }, { id: 3, contenu: 'glocaum' }]


const spacing = 1
const margin = '3px'
const columnsAntecedentsConsult = [
    {
        field: 'contenu',
        headerName: 'Antecedent',
        width: 100,
        flex: 1,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 100,
        flex: 1
    }
]

const columnsAntecedentsOph = [
    {
        field: 'contenu',
        headerName: 'Ophtalmique',
        width: 100,
        flex: 1,
        headerAlign: 'center'
    }
]

const columnsAntecedentsGen = [
    {
        field: 'contenu',
        headerName: 'Généraux',
        width: 100,
        flex: 1,
        headerAlign: 'center'
    }
]

const getUrl = (file) => {
    try {
        if (!file) {
            console.log(typeof file)
            return ""
        } else {
            console.log('tessttttt')
            return URL.createObjectURL(file)
        }
    } catch (e) {
        console.log('error')
    }

}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}
export default function DossierMedical() {
    const location=useLocation()

    const {state}=location
    const {idPat}=state
    const [patient,setPatient]=useState(null)
    const [selectedFileNames, setSelectedFileNames] = useState([])
    const [openAddConsult,setOpenAddConsult]=useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedAntecd,setSlectedAntecd]=useState({ophtal:[],gener:[]})
    const [DeletedAnteceds,setDeletedAnteceds]=useState([])
    const [preview, setPreview] = useState()
    const fileUploadInput = useRef()
    const [searchValue, setSearchValue] = useState('')
    const [selectedAnt,setSelectedAnt]= useState("")
    const [Nconsultation,setNconsultation]=useState(null)
    const [neww,setnew]=useState(true)
     console.log(Nconsultation)
    const filterModel = {
        items: [{ field: 'contenu', operator: 'contains', value: searchValue }],
    }
    const columnsPieces = [
        {
            field: 'name',
            headerName: 'Nom du fichier',
            width: 100,
            flex: 1
        },
        {
            field: '',
            headerName: 'Preview',
            width: 100,
            flex: 1,
            sortable: false,
            valueGetter: ({ row }) => {
                return row
            },
            renderCell: (params) => (<><img
                onClick={(e) => {
                    setOpen(true)
                    setPreview(params.value)
                }}
                src={getUrl(params.value)}
                width={150} /></>),

        }

    ]

    const handleFileChange = (e) => {
        let temp = selectedFiles.filter(file => true)
        console.log(temp)
        let i = 0
        while (i < e.target.files.length) {
            let exists = false
            temp.map((element) => {
                if (element.name === e.target.files[i].name) {
                    exists = true
                }
            })
            if (!exists) { temp.push(e.target.files[i]) }

            i++
        }
        setSelectedFiles(temp)
    }
    const ajoutAntecedPatient=(e)=>{
        e.preventDefault()
        const antecedents=patient.antecedents.concat(selectedAntecd.ophtal,selectedAntecd.gener)
        https://ophtaback.onrender.com+'/ajoutAntecedents/'.concat(patient._id), {
            method: 'PATCH',
            body: JSON.stringify(antecedents),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then(res => {window.location.reload()})
        })
         
    }
    const supprimeAntecds=(e)=>{
   e.preventDefault()
   console.log("antcd")
const antecedents=patient.antecedents.filter(anteced=>!DeletedAnteceds.includes(anteced))  
https://ophtaback.onrender.com+'/ajoutAntecedents/'.concat(patient._id), {
    method: 'PATCH',
    body: JSON.stringify(antecedents),
    headers: {
        "Content-Type": "application/json",
    }
}).then((res) => {
    res.json().then(res => {window.location.reload()})
})  }
    useEffect(()=>{
       https://ophtaback.onrender.com+'/getPatient/'.concat(idPat)).then(res=>{res.json().then(data=>{setPatient(data)})})
    },[])
    return (
        <>
        {patient&&
            <><Dialog open={open} onClick={(e) => setOpen(false)} height='max-content' PaperProps={{ sx: { height: 'max-content', maxHeight: 'calc(100% - 30px);' } }}>
                    <img src={getUrl(preview)} style={{ height: 'calc(100% - 30px);' }} />
                </Dialog><Grid container display='flex' flexDirection='column' flexWrap='wrap' width='-webkit-fill-available' spacing={spacing} m={margin}>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={{ width: '100%' }} sx={{ backgroundColor: '#CFF3FF' }}>
                                <Stack direction='row' useFlexGap flexWrap="wrap" justifyContent='center' justifyItems='center' spacing={{ xs: 12, ms: 8, sm: 4 }}>
                                    <Typography component='h4'> Numéro Dossier:{patient.id}</Typography>
                                    <Typography component='h4'> Nom:{patient.nom}</Typography>
                                    <Typography component='h4'> Prenom:{patient.prenom}</Typography>
                                    <Typography component='h4'>Date_Naissance:12/10/1989</Typography>
                                    <Typography component='h4'> Adresse:test adresse 1</Typography>
                                    <Typography component='h4'> Sexe:Homme</Typography>
                                    <Typography component='h4'> Telephone:{patient.telephone}</Typography>

                                </Stack>
                            </Paper>
                        </Grid>
                        <Consultation openAddConsult={openAddConsult} setnewConsult={setNconsultation} setOpenAddConsult={setOpenAddConsult} patient={patient} setnew={setnew} />
                        <Grid container display='flex' flexDirection='row' flexWrap='wrap' alignContent='flex-start' item xs={12} width='-webkit-fill-available' height='100%' spacing={spacing}>
                            <Grid container item xs={6} height='max-content' >
                                <Grid display='flex' item xs={12} height='36vh' flexDirection='column'>
                                    <Typography variant='h6' align='center' height='max-content' sx={{ backgroundColor: '#2d92b3' }}>Consultations</Typography>
                                    <Button onClick={() => {setOpenAddConsult(true);setnew(null)}}>
                                        <AddIcon />
                                    </Button>
                                    {neww&&<AfficherListeConsult Pat={patient} newconsult={Nconsultation} setnewconsult={setNconsultation}/>}
                                </Grid>
                                <Grid container display='flex' flexDirection='row' flexWrap='wrap' alignContent='flex-start' item xs={12} width='-webkit-fill-available' height='100%'>
                               <PiecesJointes patient={patient}/>
                                    

                                </Grid>
                            </Grid>

                            {/* Droite####################################################*/}
                            {/* Droite####################################################*/}
                            {/* Droite####################################################*/}
                            {/* Droite####################################################*/}
                            {/* Droite####################################################*/}
                            <Grid container item xs={6} spacing={spacing}>
                                <Grid item xs={6} height='45%'>
                                    <AjoutAnteced />
                                </Grid>
                                <Grid item xs={6} height='45%'>
                                    <AntecedPat antecedents={patient.antecedents} setDeletedAnteceds={setDeletedAnteceds} />
                                </Grid>
                                <Grid item xs={12} height='min-content' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    <Typography fullWidth align='center' variant='h6' sx={{ height: 'mix-content', backgroundColor: '#2d92b3' }}>Antecedents
                                        <IconButton disabled={!selectedAntecd.ophtal.length && !selectedAntecd.gener.length} onClick={ajoutAntecedPatient}><KeyboardArrowUpIcon /></IconButton>
                                        <IconButton disabled={!DeletedAnteceds.length} onClick={supprimeAntecds} ><KeyboardArrowDownIcon /></IconButton>
                                    </Typography>
                                    <TextField value={searchValue} size='small' inputProps={{ sx: { height: "15px" } }} sx={{}} onChange={(e) => { setSearchValue(e.target.value) } }> </TextField>
                                </Grid>
                                <AntecedMed filterModel={filterModel} antecdPat={patient.antecedents} selected={selectedAntecd} setSelected={setSlectedAntecd} />
                            </Grid>
                        </Grid>
                    </Grid></>
            }
        </>
    )
}