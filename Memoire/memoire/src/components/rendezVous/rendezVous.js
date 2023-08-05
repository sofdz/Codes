import React, { useEffect, useState } from "react";
import { DataGrid,GridOverlay } from "@mui/x-data-grid";
import { Button, Container, Grid } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import Deletee from "./delete";
import Ajout from "./ajoutrdv";
import Modif from "./midifRdv";
import Typography from '@mui/material/Typography'



const RendezVous=()=>{
    const [Patients,setPatients]=useState([])
    const [AllPatients,setAll_patients]=useState([])
    const[selectedrows,setselectedrows]=useState([])
    const[opened,setopened]=useState(false)
    const[deleted,setdeleted]=useState(false)
    const[updated,setupdated]=useState(false)
    const [updatedrow,setupdatedrow]=useState(undefined)

     function fetchdata()
      {
          fetch('https://ophtaback.onrender.com/rendezVous').then(response=>{response.json().then(data=>{setPatients(data)})}).catch(error=>{console.log(error)})
        } 
        function getRowId(row) {
            return row._id;
          }
          useEffect(()=>{
            fetch('https://ophtaback.onrender.com/patients').then(res=>{res.json().then(data=>{
                const tab=[]  
                data.map(patient=>{
                  const object={label:patient.nom+" "+patient.prenom,value:patient._id}
                  tab.push(object)
                })
                setAll_patients(tab)
            })})
        },[])
    useEffect(fetchdata,[])
    const columns=[
        { field: 'patient'  ,width: 280, headerName: 'PTIENT',renderCell:(params)=>{return <span>{params.value.nom+" "+params.value.prenom}</span> }},
        { field: 'date',width: 280,headerName: 'DATE', renderCell:(params)=>{const date=new Date(params.value);{return <span>{date.toLocaleDateString('en-GB',{timeZone:'UTC'})}</span> }}},
        { field: 'motif',width: 280, headerName: 'MOTIF'},




        
    ]
  
return(   
    <>    <Typography variant="h3" color='primary'>Rendez-Vous</Typography>
<Grid  container spacing={1}
	direction="column"
	justifyContent="center"
    alignItems='center'>
        
        {opened&&<Ajout  funct={setopened} patients={AllPatients} />}
    {deleted&&<Deletee funct={setdeleted} rdvs={selectedrows}/>}
    {updated&&<Modif funct={setupdated} patients={AllPatients} row={updatedrow} />}
        <Grid item container direction="row" justifyContent="center">
        {AllPatients.length!=0 &&<><Grid item><Button onClick={()=>{setopened(true)}}><Add></Add></Button></Grid><Grid item ><Button><Delete onClick={()=>{setdeleted(true)}} ></Delete></Button></Grid></>}
                {selectedrows.length==1&&<Grid item ><Button 
                onClick={()=>{
                    const updatedrows=Patients.filter(row=>selectedrows.includes(row._id))
                    setupdatedrow(updatedrows[0])
                    setupdated(true)
}}><EditIcon></EditIcon></Button></Grid>}
        </Grid>
        {Patients.length?<Grid item  style={{width: '90%'}}  >
       <DataGrid     hideFooter
  rows={Patients} columns={columns} getRowId={getRowId} checkboxSelection
        disableRowSelectionOnClick onRowSelectionModelChange={(newitems)=>{
            setselectedrows(newitems)
        }}  
          ></DataGrid> 
    </Grid>:<Grid item><h2>aucun Rendez-Vous n'est trouvé</h2> </Grid>}
</Grid></>

)
}

export default RendezVous