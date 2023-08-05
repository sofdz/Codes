import { Button, Container, FormControlLabel, Grid, Paper, Stack, Switch, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { act } from "react-dom/test-utils";
import Alertsupp from "./Alertsupp";
import { Add } from "@mui/icons-material";
import Diag from "./dialog";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom/dist";


const Test=()=>{
  const {user}=useAuth()
  const navigate=useNavigate()
  console.log(user)
  const getToDayDate=()=>{
    const today=new Date()
    return today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear().toString()
  }
    const [firststate,setfs]=useState([])
    const [all_patients,set_all_patients]=useState([])
    const [activer,setactiver]=useState(false)
    const [modified,setmodified]=useState(true)

    const [alert,setalert]=useState(false)
    const [deletedpat,setPat]=useState("")
    const activermodification=()=>{
      if(activer==true){
        set_all_patients(firststate)
        setmodified(true)
      }

      setactiver(!activer)
    }
    const deletepatient=(id)=>{
     console.log(id)
     const newarray=all_patients.filter(patient=>{if(patient._id!=id){return patient}})
     const dataaa=[]
newarray.map(element=>{dataaa.push(element._id)})
          fetch('https://ophtaback.onrender.com/updatefile',{
  method:'PATCH',
  body: JSON.stringify(dataaa),
  headers: {
  'Content-type': 'application/json; charset=UTF-8'
  }
  
}).then(result=>{set_all_patients(newarray);window.location.reload()}).catch(error=>{console.log(error)})
    }
    useEffect(
       ()=>{
         fetch('https://ophtaback.onrender.com/fileDattente',
         {
           method: 'GET',
           credentials: 'include',
         }).then(response=>response.json().then(data=>{setfs(data.patient);set_all_patients(data.patient)}))
      },[])
    
    const dragend=(result)=>{
const {destination,source}=result
 if(!destination||destination.index==source.index){
    return
 }
 var newarray=Array.from(all_patients)
 const sourceId=source.index
 const patient_modifie=newarray.splice(sourceId,1)[0]
 newarray.splice(destination.index,0,patient_modifie)
 set_all_patients(newarray)
 setmodified(false)
 
}
const sendrequest=()=>{
  const dataaa=[]
all_patients.map(element=>{dataaa.push(element._id)})
 fetch('https://ophtaback.onrender.com/updatefile',{
  method:'PATCH',
  body: JSON.stringify(dataaa),
  headers: {
  'Content-type': 'application/json; charset=UTF-8'
  }
  
}).then(result=>{document.location.reload()}).catch(error=>{console.log(error)})

}
const ouvrirdossier=(id,index)=>{
  const array=all_patients.slice()
   array.splice(index,1)
   fetch('https://ophtaback.onrender.com/updatefile',{
    method:'PATCH',
    body: JSON.stringify(array),
    headers: {
    'Content-type': 'application/json; charset=UTF-8'
    }
    
  }).then(result=>{navigate('/DM',{state:{idPat:id}})}).catch(error=>{console.log(error)})
}
return (
  
    <DragDropContext onDragEnd={dragend}  >
          {alert&&<Alertsupp funct={setalert} patient={deletedpat} delete={deletepatient} />}
        <Droppable droppableId="file d'attente" >
            {(provided)=>(
    <Container fixed disableGutters  style={{marginTop:'80px'}} >

     <Grid container
   direction={"column"}  
   alignContent='center'
   alignItems='center'
   ref={provided.innerRef} {...provided.droppableProps}
     >
        <Grid item><div style={{fontSize:"30px"}}>Fille d'Attente {getToDayDate()}</div></Grid>
        <Grid item><Diag patients={all_patients} funct={set_all_patients} /></Grid>
      {!all_patients.length ?<Grid><h2>La file est vide</h2></Grid>:all_patients.map((patient,index)=><Draggable key={patient._id}draggableId={patient._id.toString()} index={index} isDragDisabled={!activer}> 
      {(provided,snapshot)=>(
        <Grid width='80%' marginTop='20px' {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef} >
          <Stack direction="row" spacing={12} alignItems='center' justifyContent='center'  style={{backgroundColor:index % 2===0 ?"#2d92b3":"#a0e8ff",borderRadius:"5px",minHeight:'50px'}} >
              <Typography component='span' fontSize='30px' color='#ffffff'>{index+1}</Typography>
              <Typography fontSize='20px' color='#ffffff'>{patient.nom+" "+patient.prenom}</Typography>
              <Stack direction='row' justifyContent='center' spacing={1} >
              {(user.role=='Admin'||user.role=='Medecin')&&<Button disabled={!activer} style={{backgroundColor:activer?"#0088ff":"grey",color:"#ffffff"}} onClick={()=>{ouvrirdossier(patient._id,index)}}><VaccinesIcon/></Button>}
              <Button disabled={!activer} style={{backgroundColor:activer?"#f55353":"grey",color:"#ffffff"}} onClick={()=>{setalert(true);setPat(patient)}}><DeleteIcon/></Button>
              </Stack>
          </Stack>
      </Grid>
      )}
      </Draggable>)}
     </Grid>
     {provided.placeholder}
     <Grid container direction="row" justifyContent="space-between">
      <Grid item>
     {
     all_patients.length!=0 &&
     <FormControlLabel control={<Switch checked={activer} onChange={activermodification}></Switch>} label={activer?"desactiver modification":"activer modification"}/>
     }
     </Grid>
     
      <Grid item > 
                 <Button onClick={sendrequest} disabled={modified&&(!activer)} ><SaveIcon /></Button>
                 </Grid>
      </Grid>
     </Container>
            )}
            
    </Droppable>
    </DragDropContext>
)



}
export default Test