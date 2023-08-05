import { useState, useEffect } from "react";
import {
    IconButton, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel,
    Radio,
    Paper,
    Typography,
    Dialog,
    Alert
} from '@mui/material'

//icons
import PrintIcon from '@mui/icons-material/Print'
import ImprimerPrescription from "./ImprimerPrescription";
import Prescription from "./Prescription";
import OrdonnanceContenu from "./OrdonnanceContenu";
import ImprimerOrdonnanceContenu from "./ImprimerOrdonnanceContenu";
import OrdonnanceCorrection from "./OrdonnanceCorrection";
import ImprimerCorrection from "./ImprimerCorrection";
import DoneIcon from '@mui/icons-material/Done'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import CloseIcon from '@mui/icons-material/Close'

const types = ['Prescription', 'Orientation', 'Certificat', 'Réponse', 'Compte rendu', 'Correction']
export default function Ordonnance({ consultation, open, setOpen, patient }) {
    const [printing, setPrinting] = useState(false)

    const [ordonnance, setOrdonnance] = useState({
        _id: '',
        patient: patient,
        consultation: consultation._id,
        type: "Prescription",
        medicaments: [],
        contenu: ""
    })
    const [newOrd, setNewOrd] = useState(false)
    const [ordonnances, setOrdonnances] = useState([])
    const [indexOrd, setIndexOrd] = useState(0)
    const [affichage,setAffichage] = useState(false)
    const [confirmerSup,setConfirmerSup] = useState(false)
    useEffect(() => {

        fetch('https://ophtaback.onrender.com/ordonnances/'.concat(consultation._id)).then(res => res.json().then((data) => {
            setOrdonnances(data)
            if (data.length > 0) {
                const temp = data[data.length - 1]
                setIndexOrd(data.length - 1)
                switch (temp.typeOrd) {
                    case 'Prescription':
                        console.log(temp.medicaments)
                        setOrdonnance((prev) => ({
                            ...prev,
                            _id: temp._id,
                            type: temp.typeOrd,
                            medicaments: temp.medicaments
                        }))
                        break
                    case 'Correction':
                        setOrdonnance((prev) => ({
                            ...prev,
                            _id: temp._id,
                            type: temp.typeOrd
                        }))
                        break
                    default:
                        if (temp.contenu) {
                            setOrdonnance((prev) => ({
                                ...prev,
                                _id: temp._id,
                                type: temp.typeOrd,
                                contenu: temp.contenu
                            }))
                        }
                }

                setNewOrd(false)
            } else {
                setNewOrd(true)
            }
        }))
    }, [affichage])

    useEffect(() => {

        if (ordonnances.length !== 0 && ordonnances[indexOrd].typeOrd) {
            const temp = ordonnances[indexOrd]
            console.log("ACTUAL ORD IS +++++++",temp)
            switch (temp.typeOrd) {
                case 'Prescription':
                    setOrdonnance((prev) => ({
                        ...prev,
                        _id: temp._id,
                        type: temp.typeOrd,
                        medicaments: temp.medicaments
                    }))
                    break
                case 'Correction':
                    setOrdonnance((prev) => ({
                        ...prev,
                        _id: temp._id,
                        type: temp.typeOrd
                    }))
                    break
                default:
                    if (temp.contenu) {
                        setOrdonnance((prev) => ({
                            ...prev,
                            _id: temp._id,
                            type: temp.typeOrd,
                            contenu: temp.contenu
                        }))
                    }
            }
        }
    }, [indexOrd])


    const handleChange = (e) => {
        setOrdonnance((previousOrdonnance) => ({
            ...previousOrdonnance,
            [e.target.name]: e.target.value
        }))


    }

    const validerOrdonnance = () => {
        let ord = null
        if (newOrd) {
            switch (ordonnance.type) {
                case 'Prescription':
                    ord = {
                        consultation: ordonnance.consultation,
                        typeOrd: "Prescription",
                        medicaments: ordonnance.medicaments,
                    }
                    break
                case 'Correction':
                    ord = {
                        consultation: ordonnance.consultation,
                        typeOrd: "Correction"
                    }
                    break
                default:
                    ord = {
                        consultation: ordonnance.consultation,
                        typeOrd: ordonnance.type,
                        contenu: ordonnance.contenu,
                    }
                    break
            }
            const urlParams = {
                method: 'POST',
                body: JSON.stringify(ord),
                headers: {
                    "Content-Type": 'application/json'
                },
            }

            fetch('https://ophtaback.onrender.comcreatedOrd', urlParams).then(res => res.json().then((data) => {
                //refreshOrd()
                setAffichage(!affichage)
            })).catch(e => console.log("ERREUR", e))

        } else {
            switch (ordonnance.type) {
                case 'Prescription':
                    let tempMed = []
                    ordonnance.medicaments.forEach((med) => {
                        tempMed.push({ medicament: med.medicament._id, posologie: med.posologie })
                    })
                    ord = {
                        medicaments: tempMed,
                    }
                    break
                case 'Correction':
                    console.log('correction')
                    break
                default:
                    ord = {
                        contenu: ordonnance.contenu,
                    }
                    break
            }
            const urlParams = {
                method: 'PATCH',
                body: JSON.stringify(ord),
                headers: {
                    "Content-Type": 'application/json'
                },
            }
            fetch('https://ophtaback.onrender.comordonnance/'.concat(ordonnance._id), urlParams).then(res => res.json().then((data) => {
            })).catch(e => console.log('ERREURE', e))



        }

    }

    const nouvelleOrd = () => {
        setNewOrd(true)
        setOrdonnance({
            _id: '',
            patient: patient,
            consultation: consultation._id,
            type: "Prescription",
            medicaments: [],
            contenu: ""
        })
    }

    const supprimerOrd = ()=>{
        const urlParams = {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            },
        }
        fetch('https://ophtaback.onrender.comordonnance/'.concat(ordonnance._id), urlParams).then(res => res.json().then((data) => {
            console.log('objet supprimé :',data)
            setAffichage(!affichage)
            setConfirmerSup(false)
        })).catch(e => console.log('ERREURE', e))
    }



    return (<Dialog open={open} PaperProps={{ sx: { maxWidth: '100vw', height: '100vh', m: '33px' } }} onClose={() => { setOpen(false) }}>
        <>  
            {confirmerSup && <Alert title="Confirmer la suppression" severity="warning">
                <Typography variant="body1">Voulez vous supprimer l'ordonnance N° {indexOrd+1} ?</Typography>
                <IconButton onClick={()=>{setConfirmerSup(false)}}> <CloseIcon /> </IconButton>
                <IconButton onClick={supprimerOrd}> <DoneIcon /></IconButton>
            </Alert>}
            <Grid color='#1976d2' container display='flex' flexDirection='row' width='100%' wrap="nowrap" justifyContent='space-between'>
                <IconButton size='large' color="inherit" onClick={(e) => {
                    if(newOrd) {validerOrdonnance()}
                    setPrinting(true)
                }}>
                    <PrintIcon />
                    <Typography color='inherit'> Imprimer</Typography>
                </IconButton>
                {ordonnance.type === 'Prescription' &&
                    <ImprimerPrescription printing={printing} setPrinting={setPrinting} ordonnance={ordonnance} />}

                {(ordonnance.type !== 'Prescription' && ordonnance.type !== 'Correction') &&
                    <ImprimerOrdonnanceContenu printing={printing} setPrinting={setPrinting} ordonnance={ordonnance} />
                }

                {ordonnance.type === 'Correction' &&
                    <ImprimerCorrection printing={printing} setPrinting={setPrinting} ordonnance={ordonnance} consultation={consultation} />
                }


                <Grid item container flexDirection='row' justifyContent='center'>
                    {!newOrd && <IconButton disabled={(indexOrd === 0)} hidden={newOrd} size='large' color="inherit" onClick={() => { setIndexOrd(indexOrd - 1) }}><KeyboardDoubleArrowLeftIcon /></IconButton>}
                    <Grid xs={2} container item display='flex' wrap='nowrap' alignItems='center' flexDirection='column'>
                        <IconButton disabled={newOrd} size='large' color="inherit" onClick={nouvelleOrd}> <AddIcon /></IconButton>
                        <Typography color='black'>{!newOrd && 'Ordonnance N° '.concat(indexOrd+1)} {newOrd && 'Nouvelle Ordonnance'}</Typography>
                    </Grid>
                    {!newOrd && <IconButton disabled={(indexOrd === ordonnances.length - 1)} hidden={newOrd} size='large' color="inherit" onClick={() => { setIndexOrd(indexOrd + 1) }}><KeyboardDoubleArrowRightIcon /></IconButton>}
                </Grid>
                <IconButton size='large' color="inherit" onClick={validerOrdonnance}><DoneIcon /> <Typography> valider</Typography></IconButton></Grid>
            <Paper sx={{ height: '79vh', m: 1 }} elevation={3}>
                <Grid container sx={{ width: '100%', height: '100%' }} spacing={1}>
                    <Grid container item xs={12} width='100%'>
                        <Grid container item xs={12} width='100%' wrap="nowrap">
                            <FormControl sx={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>

                                <Grid container item xs={10} width='100%' height='min-content' display='flex' flexDirection='column' >
                                    <Grid item xs={12} display='flex' flexDirection='row' >
                                        <FormLabel sx={{ width: '100%' }} id="type-ordonnance-from-label">Type d'ordonnance</FormLabel>

                                    </Grid>
                                    <RadioGroup
                                        aria-labelledby="type-ordonnance-radio-group"
                                        value={ordonnance.type}
                                        onChange={handleChange}
                                        name='type'
                                        sx={{ width: 'max-content', flexDirection: 'row', flexWrap: 'nowrap' }}

                                    >
                                        {types.map((t) => (


                                            <FormControlLabel value={t} control={<Radio disabled={!newOrd} />} label={t} />
                                        ))}


                                    </RadioGroup>

                                </Grid>
                            </FormControl>
                            <IconButton sx={{color:'red'}} onClick={()=>{setConfirmerSup(true)}} ><DeleteIcon color='red'/></IconButton>
                        </Grid>
                        <Grid container item xs={12} position='relative' sx={{ height: '85%' }} spacing={1} flexDirection='row' justifyItems='center'>
                            {ordonnance.type === 'Prescription' &&
                                <Prescription ordonnance={ordonnance} setOrdonnance={setOrdonnance} />}

                            {(ordonnance.type !== 'Prescription' && ordonnance.type !== 'Correction') && <OrdonnanceContenu ordonnance={ordonnance} setOrdonnance={setOrdonnance} />}

                            {ordonnance.type === 'Correction' && <OrdonnanceCorrection ordonnance={ordonnance} consultation={consultation} />}
                        </Grid>


                    </Grid>
                </Grid>
            </Paper>
        </>
    </Dialog>
    )
}