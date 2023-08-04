import { Button, Dialog, Grid, IconButton,Divider,Typography } from "@mui/material";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import parse from 'html-react-parser'
import moment from "moment";

//icons
import CloseIcon from '@mui/icons-material/Close'
//
import header from './../../images/header.jpg'
import footer from './../../images/footer.jpg'

export default function ImprimerOrdonnanceContenu({ printing, setPrinting, ordonnance }) {
    const componentRef = useRef()
    return (
        <>

            <Dialog open={printing} onClose={()=>{setPrinting(false)}}>
                <Grid container display='grid' >
                    <Grid xs={12} item>
                        <IconButton onClick={(e) => { setPrinting(false) }}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <ReactToPrint trigger={() => (<Button>Imprimer</Button>)} content={() => componentRef.current} />
                    </Grid>
                    <Grid container item display='flex' alignContent='flex-start' sx={{
                        '& .MuiGrid-root': {
                            display: 'flex',
                        }, width: '580px', height: '675px'
                    }} ref={componentRef}>
                        <Grid item xs={12}>
                            <img alt='' src={header} />
                        </Grid>
                        <Grid item xs={12} flexDirection='column'><Divider flexItem color="black" variant="fullWidth" /></Grid>
                        <Grid item xs={12} display='flex' flexDirection='row' justifyContent='space-between' flexWrap='nowrap' justifySelf='flex-start' >
                            <Typography fullWidth marginLeft={4.5} align='left' color='black' variant='body2'> Nom du patient : {ordonnance.patient.nom} {ordonnance.patient.prenom}</Typography>
                        
                            <Typography fullWidth marginRight={6.5} align='right' color='black' variant='body2'> Le {moment(Date.now()).format('DD/MM/YYYY')}</Typography>
                        </Grid>
                        <Grid item xs={12} justifyContent='center' display='grid'>
                            <Typography variant="h6" >{ordonnance.type}</Typography>
                        </Grid>

                        
                        <Grid item xs={12} alignItems='center' alignContent='center' m='0px 35px'>
                            <>{printing && <div style={{ width: '100%' }}>{parse(ordonnance.contenu)}</div>}</>
                        </Grid>
                        <Grid item xs={12} position='absolute' justifySelf='flex-end' bottom={1}>
                            <img alt='' src={footer} />

                        </Grid>
                    </Grid>


                </Grid>
            </Dialog>

        </>
    )
}