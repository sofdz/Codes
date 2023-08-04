import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { Dialog, IconButton, Grid, Divider, Typography, Button, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from "@mui/material";
import moment from "moment";

import header from './../../images/header.jpg'
import footer from './../../images/footer.jpg'

//icons
import CloseIcon from '@mui/icons-material/Close'

export default function ImprimerCorrection({ printing, setPrinting, ordonnance, consultation }) {
    const componentRef = useRef()

    return (
        <>
            <Dialog open={printing} onClose={()=>{setPrinting(false)}}>
                <Grid container display='grid' minHeight='min-content'>
                    <Grid container item height='min-content' display='flex' wrap='nowrap' flexDirection='row' justifyContent='space-between'>
                        <Grid item xs={1}>
                            <ReactToPrint trigger={() => (<Button>Imprimer</Button>)} content={() => componentRef.current} />
                        </Grid>
                        <Grid xs={1} item>
                            <IconButton onClick={(e) => { setPrinting(false) }}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>

                    </Grid>
                    <Grid hidden container spacing={2} xs={12} item display='flex' justifyItems='center' alignContent='flex-start' sx={{
                        '& .MuiGrid-root': {
                            display: 'flex',
                        }, width: '580px', height: '675px', justifyItems: 'center'
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


                        <Grid item xs={12} alignItems='center' minWidth={500} justifyContent='center' alignContent='center' m='0px 35px' maxWidth='60%' sx={{
                            alignItems: 'center',
                            minWidth: 500
                        }}>

                            <TableContainer component={Paper} >
                                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left"><Typography variant='body2'> <u><strong>Vision de loin</strong></u></Typography></TableCell>
                                            <TableCell align="center">Sphère</TableCell>
                                            <TableCell align="center">Cylindre</TableCell>
                                            <TableCell align="center">Axe</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow
                                            //key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                OD
                                            </TableCell>
                                            <TableCell align="center">{consultation.OD.refraction.s}</TableCell>
                                            <TableCell align="center">{consultation.OD.refraction.c}</TableCell>
                                            <TableCell align="center">{consultation.OD.refraction.a}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            //key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                OG
                                            </TableCell>
                                            <TableCell align="center">{consultation.OG.refraction.s}</TableCell>
                                            <TableCell align="center">{consultation.OG.refraction.c}</TableCell>
                                            <TableCell align="center">{consultation.OG.refraction.a}</TableCell>
                                        </TableRow>


                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} alignItems='center' minWidth={500} justifyContent='center' alignContent='center' m='0px 35px' maxWidth='60%' sx={{
                            alignItems: 'center',
                            minWidth: 500
                        }}>

                            {((consultation.OG.addition !==0 && consultation.OG.addition!=="")||(consultation.OD.addition !==0&&consultation.OD.addition!==""))  &&
                                <TableContainer component={Paper} >
                                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left"><Typography variant='body2'> <u><strong>Vision de prés</strong></u></Typography></TableCell>
                                            <TableCell align="center">Sphère</TableCell>
                                            <TableCell align="center">Cylindre</TableCell>
                                            <TableCell align="center">Axe</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow
                                            //key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                OD
                                            </TableCell>
                                            <TableCell align="center">{consultation.OD.refraction.s + consultation.OD.addition}</TableCell>
                                            <TableCell align="center">PLAN</TableCell>
                                            <TableCell align="center">PLAN</TableCell>
                                        </TableRow>
                                        <TableRow
                                            //key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                OG
                                            </TableCell>
                                            <TableCell align="center">{consultation.OG.refraction.s + consultation.OG.addition}</TableCell>
                                            <TableCell align="center">PLAN</TableCell>
                                            <TableCell align="center">PLAN</TableCell>
                                        </TableRow>


                                    </TableBody>
                                </Table>
                            </TableContainer>}
                        </Grid>
                        <Grid item xs={12} position='absolute' justifySelf='flex-end' bottom={1}>
                            <img style={{position:'fixed'}} alt='' src={footer} />

                        </Grid>
                    </Grid>


                </Grid>
            </Dialog>
        </>
    )
}