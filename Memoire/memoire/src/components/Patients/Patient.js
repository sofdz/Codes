import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, useGridApiContext, useGridApiRef,GridActionsCellItem } from '@mui/x-data-grid';
import AjouterPatient from './AjouterPatient';
import { Button, Container, Dialog, Grid, IconButton, Typography } from '@mui/material';
import ModifierPatient from './ModifierPatient';
import SupprimerPatient from './SupprimerPatient';
import Deletee from './delete';
import VaccinesIcon from '@mui/icons-material/Vaccines';
//ICONS
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
export default function Patient() {
  const {user}=useAuth()
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selected, setSelected] = useState([])
  const [patients, setPatients] = useState([])
  const [deleting, setDeleting] = useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    fetch('https://ophtaback.onrender.com/Patients').then((response) => {
      response.json().then((data) => {console.log(data)
        setPatients(data)
      })
    })
  }, [])

  const columns = [
    { field: 'id', headerName: 'N° Patient',width:90},
    {
      field: 'nom',
      headerName: 'Nom',
      editable: true,
      flex:1
    },
    {
      field: 'prenom',
      headerName: 'Prénom',
      editable: true,
      flex:1
    },
    {
      field: 'dateN',
      headerName: 'Date de naissance',
      type: 'date',
      valueGetter: ({ value }) => new Date(value),
      editable: true,
      flex:1
    },
    {
      field: 'sexe',
      headerName: 'Sexe',
      sortable: false,
      flex:1
    },
    {
      field: 'adresse',
      headerName: 'Adresse',
      sortable: false,
      flex:1
    },
    {
      field: 'telephone',
      headerName: 'Téléphone',
      sortable: false,
      flex:1
    },
    {
      field: 'actions',
      headerName: 'Dossier Médical',
      type: 'actions',
      flex:1,
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem disabled={user.role!='Admin'&&user.role!='Medecin'} label='consulter dossier medical ' icon={<VaccinesIcon/>} onClick={()=>{navigate('/DM',{state:{idPat:params.row._id}})} } />,
      ]
    }
  ];
  return (
    <>
              <AjouterPatient open={openAdd} setOpen={setOpenAdd} />
    <Typography variant="h3" color='primary'>Patients</Typography>
        <Grid container spacing={2}
        direction="column"
        justifyContent="center"
        alignItems='center'>
          {deleting&&<Deletee setDeleting={setDeleting} deletedpts={selected} />}
          {openEdit&&<ModifierPatient setOpen={setOpenEdit} modified={selected[0]} row={patients.filter(pat=>pat._id==selected)[0]}/>}
          <Grid container item direction='row' justifyContent="center">
             <Grid item> <Button onClick={() => setOpenAdd(true)}> <AddIcon /></Button></Grid>
             <Grid item ><Button onClick={()=>{setDeleting(true)}}><DeleteIcon /></Button></Grid>
             {selected.length==1&&<Grid item><Button onClick={() => setOpenEdit(true)}> <EditTwoToneIcon /></Button></Grid>}
          </Grid>
          {patients.length?
          <Grid item  style={{width: '100%'}}>
          <DataGrid
            rows={patients}
            columns={columns}
            getRowId={(row) => row._id}
            responsiveLayout
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(items) => { setSelected(items) }}
            hideFooter

          />
          </Grid>:<Grid><h2>aucun patient est trouvé</h2></Grid>}
          
        </Grid>
        
        
     </>
    
        

       
      
 
  );
}