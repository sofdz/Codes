import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CheckIcon from '@mui/icons-material/Check'
import Divider from '@mui/material/Divider';
import { Grid,FormControlLabel,Paper, Stack, TextField, FormGroup, Card, CardContent, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import {Checkbox} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useAuth } from '../../hooks/useAuth';
import AjouterActes from './AjouterActes';
import Ordonnance from '../Ordonnance/Ordonnance';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ModifConsult({consultation,open,patient,setopenmodified,setconsult}) {
    console.log(consultation+'midifconsult')
    const {user}=useAuth()
    const addConsultaion=(e)=>{
        if(!actes_consult.length){setOpen_acte(true);return}  
     e.preventDefault()
       var consultationmodif={
        motif:motif_DP.motif,
        liste_actes:actes_consult,
        DP:motif_DP.distance,
        OD:{
            refraction:{
                s:RefractionD.S,
                c:RefractionD.C,
                a:RefractionD.A,
            },
            correction:{
                s:CorrectionD.S,
                c:CorrectionD.C,
                a:CorrectionD.A,
            },
            TO:infosD.TO,
            PCH:infosD.PCH,
            remarqueLaf:infosD.LAF,
            remarqueFo:infosD.FO,
            addition:infosD.addition
        },
        OG:{
            refraction:{
                s:RefractionG.S,
                c:RefractionG.C,
                a:RefractionG.A,
            },
            correction:{
                s:CorrectionG.S,
                c:CorrectionG.C,
                a:CorrectionG.A,
            },
            TO:infosG.TO,
            PCH:infosG.PCH,
            remarqueLaf:infosG.LAF,
            remarqueFo:infosG.FO,
            addition:infosG.addition
        },
    }
    if(checkDilatation){
        const dilatation={
            type_dil:dilatInfo.type_dil,
            correctionD:{s:DilatationD.S,c:DilatationD.C, a:DilatationD.A
             },
             correctionG:{s:DilatationG.S,c:DilatationG.C, a:DilatationG.A
               },
             remarque_dil:dilatInfo.remarque_dil
          } 
        consultationmodif={...consultationmodif,dilatation}
    }
    https://ophtaback.onrender.com+'/modifConsultation/'.concat(consultation._id), {
        method: 'PATCH',
        body: JSON.stringify(consultationmodif),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(res=>{res.json().then(data=>{console.log(data)})})
       }
    const handleClose = () => {
        setconsult(null)
        setopenmodified(false);
        document.location.reload()
    };
    const [actes_consult,setActesConsult]=useState(consultation.liste_actes)
    const [RefractionG,setRefractionG]=useState({S:consultation.OG.refraction.s,C:consultation.OG.refraction.c,A:consultation.OG.refraction.a})
    const [CorrectionG,setCorrectionG]=useState({S:consultation.OG.correction.s,C:consultation.OG.correction.c,A:consultation.OG.correction.a})
    const [infosG,setinfosG]=useState({TO:consultation.OG.TO,PCH:consultation.OG.PCH,LAF:consultation.OG.remarqueLaf,FO:consultation.OG.remarqueFo,addition:consultation.OG.addition})
    const [RefractionD,setRefractionD]=useState({S:consultation.OD.refraction.s,C:consultation.OD.refraction.c,A:consultation.OD.refraction.a})
    const [CorrectionD,setCorrectionD]=useState({S:consultation.OD.correction.s,C:consultation.OD.correction.c,A:consultation.OD.correction.a})
    const [infosD,setinfosD]=useState({TO:consultation.OD.TO,PCH:consultation.OD.PCH,LAF:consultation.OD.remarqueLaf,FO:consultation.OD.remarqueFo,addition:consultation.OD.addition})
        const [checkDilatation,setcheckDilatation]=useState(false)
        const [DilatationG,setDilatationG]=useState({S:0,C:0,A:0})
        const [DilatationD,setDilatationD]=useState({S:0,C:0,A:0})
        const [dilatInfo,setdilatInfo]=useState({type_dil:'Cyclopentolate',remarque_dil:''})
    const [motif_DP,setMD]=useState({motif:consultation.motif,distance:consultation.DP,patient})
    const [open_acte,setOpen_acte]=useState(false)
    const [openOrd,setOpenOrd]=useState(false)
    useEffect(()=>{
        const dilatation=consultation.dilatation
     if(dilatation!=undefined){
        setcheckDilatation(true)
        setDilatationD({S:dilatation.correctionD.s,C:dilatation.correctionD.c,A:dilatation.correctionD.a})
        setDilatationG({S:dilatation.correctionG.s,C:dilatation.correctionG.c,A:dilatation.correctionG.a})
        setdilatInfo(prevs=>({type_dil:dilatation.type_dil,remarque_dil:dilatation.remarque_dil}))
     }
    },[])

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {openOrd&&<Ordonnance consultation={consultation} open={openOrd} setOpen={setOpenOrd} patient={patient} />}
                <AppBar position='static'>
                    <Toolbar>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton></Grid>
                            <Grid item>
                                <Typography component='h3' style={{left:'auto'}}> Modifier cette consultation :  </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton autoFocus color="inherit" onClick={addConsultaion} style={{ left: 'auto' }}>
                                    <CheckIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Stack direction='row'  alignItems='stretch' justifyContent='baseline' spacing={{xs:1,sm:2}} height='100%'>
                    <Paper elevation={5} style={{width:'100%',backgroundColor:'#d6d6cd',height:'100%'}}>
                    <Typography variant='h6' style={{color:'#000000'}}>Informations de la Consultation: </Typography>
                        <Typography variant='h6' style={{color:'#000000'}}>Fait par Dr:{user.nom+" "+user.prenom}</Typography>
                        <Typography variant='h6' style={{color:'#000000'}}>Pour le patient:{patient.nom+" "+patient.prenom}</Typography>
                        <TextField fullWidth multiline value={motif_DP.motif} onChange={(e)=>{e.preventDefault();setMD(prevs=>({...prevs,motif:e.target.value}))}} label='motif de la consultation' rows={2} style={{backgroundColor:'#ffffff',borderRadius:'10px',marginTop:'10px'}}></TextField>
                        <TextField fullWidth label='Distance interpupilaire' value={motif_DP.distance} type='number' onChange={(e)=>{e.preventDefault();if(e.target.value>=0&&e.target.value[e.target.value.length-1]!=undefined){setMD(prevs=>({...prevs,distance:e.target.value}))}}} style={{backgroundColor:'#ffffff',borderRadius:'10px',marginTop:'10px'}}></TextField>
                        <FormGroup>
                        <FormControlLabel control={<Checkbox  checked={checkDilatation} onChange={()=>{setcheckDilatation(prevs=>!prevs)}}/>} label="Dilatation" />
                        </FormGroup>
                        {checkDilatation&&<Card variant='outlined'>
                            <CardContent>
                                <Typography variant='h6'>informations de la Dilataion:</Typography>
                                <Select  label="Type" value={dilatInfo.type_dil} onChange={e=>{e.preventDefault();setdilatInfo(prevs=>({...prevs,type_dil:e.target.value}))}} fullWidth>
                                    <MenuItem  value='Cyclopentolate'>Cyclopentolate</MenuItem>
                                    <MenuItem value='atropine'>Atropine</MenuItem>
                                    <MenuItem  value='Mydriaticum' >Mydriaticum</MenuItem>
                                </Select>
                                <TextField sx={{marginTop:'10px'}} label='remarque' fullWidth value={dilatInfo.remarque_dil} onChange={e=>{e.preventDefault();setdilatInfo(prevs=>({...prevs,remarque_dil:e.target.value}))}} multiline maxRows={4} ></TextField>
                            </CardContent>      
                            </Card>}
                            <Stack direction='row' justifyContent='center' alignItems='center'   divider={<Divider orientation="vertical" flexItem />}>
                                <IconButton onClick={()=>{setOpenOrd(true)}}><ArticleIcon/>Ordonnance</IconButton>
                                <IconButton onClick={()=>{setOpen_acte(true)}}><DescriptionIcon />Acte</IconButton>
                                <AjouterActes open_acte={open_acte} setOpen_acte={setOpen_acte} actConsult={actes_consult} setActesConsult={setActesConsult} etat={consultation.reg.etat}/>
                            </Stack>
                    </Paper>
                    <Paper elevation={5} style={{width:'100%' ,height:'100%'}}>
                        <form>
                            <Grid container direction='row' justifyContent='center' >
                                <Grid item container direction='row' justifyContent='center'><Button color='primary'><RemoveRedEyeOutlinedIcon/>gauche</Button></Grid>
                            <Grid item xs={12}><Typography variant='h6'>Refraction:</Typography></Grid>
                            <Grid item xs={4}><TextField  label='Sphere' type='number' value={RefractionG.S} onChange={(e)=>{e.preventDefault();setRefractionG(prevs=>({...prevs,S:e.target.value}));setCorrectionG(prevs=>({...prevs,S:e.target.value}))}}></TextField></Grid>
                            <Grid item xs={4}><TextField label='Cylindre' type='number' value={RefractionG.C} onChange={(e)=>{e.preventDefault();setRefractionG(prevs=>({...prevs,C:e.target.value}));setCorrectionG(prevs=>({...prevs,C:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Axe' type='number' value={RefractionG.A}  onChange={(e)=>{e.preventDefault();setRefractionG(prevs=>({...prevs,A:e.target.value}));setCorrectionG(prevs=>({...prevs,A:e.target.value}))}}></TextField></Grid>
                            <Grid item xs={12}><Typography variant='h6' >Correction:</Typography></Grid>
                            <Grid item xs={4}><TextField label='Sphere' value={CorrectionG.S} type='number' onChange={(e)=>{setCorrectionG(prevs=>({...prevs,S:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Cylindre' value={CorrectionG.C} type='number' onChange={(e)=>{setCorrectionG(prevs=>({...prevs,C:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Axe' value={CorrectionG.A} type='number' onChange={(e)=>{setCorrectionG(prevs=>({...prevs,A:e.target.value}))}}></TextField></Grid>
                            <Grid item xs={6}><TextField label='T_O' type='number' value={infosG.TO} onChange={(e)=>{e.preventDefault();setinfosG(prevs=>({...prevs,TO:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={6}><TextField label='Pachy' type='number' value={infosG.PCH} onChange={(e)=>{e.preventDefault();setinfosG(prevs=>({...prevs,PCH:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={6}><TextField label='Addition' type='number' value={infosG.addition} onChange={(e)=>{e.preventDefault();setinfosG(prevs=>({...prevs,addition:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={6}><TextField label='Remarque LAF' value={infosG.LAF} onChange={(e)=>{e.preventDefault();setinfosG(prevs=>({...prevs,LAF:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={12}><TextField label='Remarque FO' value={infosG.FO} onChange={(e)=>{e.preventDefault();setinfosG(prevs=>({...prevs,FO:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            {checkDilatation?
                            <>
                            <Grid item xs={12}><Typography variant='h6' >Dilatation:</Typography></Grid>
                            <Grid item xs={4}><TextField  label='Sphere' type='number' value={DilatationG.S} onChange={(e)=>{e.preventDefault();setDilatationG(prevs=>({...prevs,S:e.target.value}))}}></TextField></Grid>
                            <Grid item xs={4}><TextField label='Cylindre' type='number' value={DilatationG.C} onChange={(e)=>{e.preventDefault();setDilatationG(prevs=>({...prevs,C:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Axe' type='number' value={DilatationG.A}  onChange={(e)=>{e.preventDefault();setDilatationG(prevs=>({...prevs,A:e.target.value}))}}></TextField></Grid>      
                                                  </>
                            :null}
                            </Grid>
                        </form>
                    </Paper>
                    <Paper elevation={5} style={{width:'100%',height:'100%'}} >
                        <form>
                            <Grid container direction='row' justifyContent='center' >
                            <Grid item container direction='row' justifyContent='center'><Button color='primary'><RemoveRedEyeOutlinedIcon/>droit</Button></Grid>
                            <Grid item xs={12}><Typography variant='h6'>Refraction:</Typography></Grid>
                            <Grid item xs={4}><TextField type='number' label='Sphere' value={RefractionD.S}  onChange={(e)=>{e.preventDefault();setRefractionD(prevs=>({...prevs,S:e.target.value}));setCorrectionD(prevs=>({...prevs,S:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Cylindre' type='number' value={RefractionD.C} onChange={(e)=>{e.preventDefault();setRefractionD(prevs=>({...prevs,C:e.target.value}));setCorrectionD(prevs=>({...prevs,C:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Axe' type='number' value={RefractionD.A}  onChange={(e)=>{e.preventDefault();setRefractionD(prevs=>({...prevs,A:e.target.value}));setCorrectionD(prevs=>({...prevs,A:e.target.value}))}}  ></TextField></Grid>
                            <Grid item xs={12}><Typography variant='h6'>Correction:</Typography></Grid>
                            <Grid item xs={4}><TextField label='Sphere' type='number' value={CorrectionD.S} onChange={(e)=>{setCorrectionD(prevs=>({...prevs,S:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Cylindre' type='number' value={CorrectionD.C} onChange={(e)=>{setCorrectionD(prevs=>({...prevs,C:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Axe' type='number' value={CorrectionD.A} onChange={(e)=>{setCorrectionD(prevs=>({...prevs,A:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={6}><TextField label='T_O' type='number' value={infosD.TO} onChange={(e)=>{e.preventDefault();setinfosD(prevs=>({...prevs,TO:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={6}><TextField label='Pachy' type='number' value={infosD.PCH} onChange={(e)=>{e.preventDefault();setinfosD(prevs=>({...prevs,PCH:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={6}><TextField label='Addition' type='number' value={infosD.addition} onChange={(e)=>{e.preventDefault();setinfosD(prevs=>({...prevs,addition:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={6}><TextField label='Remarque LAF' value={infosD.LAF} onChange={(e)=>{e.preventDefault();setinfosD(prevs=>({...prevs,LAF:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            <Grid item xs={12}><TextField label='Remarque FO' value={infosD.FO} onChange={(e)=>{e.preventDefault();setinfosD(prevs=>({...prevs,FO:e.target.value}))}} fullWidth sx={{marginTop:'10px'}}></TextField></Grid>
                            {checkDilatation?
                            <>
                            <Grid item xs={12}><Typography variant='h6' >Dilatation:</Typography></Grid>
                            <Grid item xs={4}><TextField  label='Sphere' type='number' value={DilatationD.S} onChange={(e)=>{e.preventDefault();setDilatationD(prevs=>({...prevs,S:e.target.value}))}}></TextField></Grid>
                            <Grid item xs={4}><TextField label='Cylindre' type='number' value={DilatationD.C} onChange={(e)=>{e.preventDefault();setDilatationD(prevs=>({...prevs,C:e.target.value}))}} ></TextField></Grid>
                            <Grid item xs={4}><TextField label='Axe' type='number' value={DilatationD.A}  onChange={(e)=>{e.preventDefault();setDilatationD(prevs=>({...prevs,A:e.target.value}))}}></TextField></Grid>      
                                                  </>
                            :null}
                            </Grid>
                        </form>
                    </Paper>
                </Stack>
            </Dialog>
        </>
    );






}



export default ModifConsult