import { Divider, Grid, Typography, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from "@mui/material";

export default function OrdonnanceCorrection({ ordonnance,consultation }) {

    return (
        <Grid container> 
            <Grid item container spacing={2} display='flex' flexDirection='row' wrap='nowrap' alignItems='center' justifyContent='space-around' xs={12} height='min-content'>
                <Grid item xs={3}>
                    <Typography variant='h4' > Vision de loin :</Typography>
                </Grid>
                <Grid item xs={4}><TableContainer component={Paper} >
                    <Table sx={{ minWidth: 300 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell ></TableCell>
                                <TableCell align="center">Sphère</TableCell>
                                <TableCell align="center">Cylindre</TableCell>
                                <TableCell align="center">Axe</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow
                                //key={row.name}
                                
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

            </Grid>
            <Grid item xs={12}><Divider /></Grid>
            <Grid container item xs={12} spacing={2} display='flex' flexDirection='row' wrap='nowrap' alignItems='center' justifyContent='space-around' height='min-content'>
            {consultation.OG.addition&&consultation.OD.addition  &&<>
                <Grid item xs={3}>
                    <Typography variant='h4' > Vision de prés :</Typography>
                </Grid>
                <Grid item xs={4}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
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
                                    <TableCell align="center">{consultation.OD.refraction.s+consultation.OD.addition}</TableCell>
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
                                    <TableCell align="center">{consultation.OG.refraction.s+consultation.OG.addition}</TableCell>
                                    <TableCell align="center">PLAN</TableCell>
                                    <TableCell align="center">PLAN</TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid></>}

            </Grid>
        </Grid>


    )
}