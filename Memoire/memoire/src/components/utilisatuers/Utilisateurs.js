import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Grid,Typography,Button } from '@mui/material'
import Adduser from './Adduser'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import ModifierUser from './ModiferUser'
import Deletee from './Delete'

function Utilisateurs() {
    const [users,setusers]=useState(null)
    const [openAdd,setOpenAdd]=useState(false)
    const [openUpdate,setopenUpdate]=useState(false)
    const [selected,setSelected]=useState([])
    const columns = [
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
            field: 'nom_utilisateur',
            headerName: 'Nom utilisateur',
            editable: true,
            flex:1
          }
        ,
        {
            field: 'telephone',
            headerName: 'Téléphone',
            sortable: false,
            flex:1
          }, {
            field: 'role',
            headerName: 'Role',
            sortable: false,
            flex:1
          },]
    useEffect(()=>{
    fetch('/userss').then(res=>{res.json().then(data=>{setusers(data)})})
    },[])
  return (
    <>
<Typography variant="h3" color='primary'>Utilisateurs</Typography>
    {users&&
    <Grid container direction='column' justifyContent='center' alignContent='center' alignItems='center'>
            <Adduser open={openAdd} setopen={setOpenAdd} usernames={users.map(user=>user.nom_utilisateur)}/>
            {openUpdate&&<ModifierUser setopen={setopenUpdate} userM={users.find(user=>user._id==selected)} usernames={users.map(user=>{if(user._id!=selected){return(user.nom_utilisateur)}})}/>}
          <Grid container item direction='row' justifyContent="center">
             <Grid item> <Button onClick={() => setOpenAdd(true)}> <AddIcon /></Button></Grid>
             {selected.length==1&&<Grid item><Button onClick={() => {setopenUpdate(true)}}> <EditTwoToneIcon /></Button></Grid>}
          </Grid> 
    <Grid item width='90%'>
    <DataGrid
    rows={users}
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
    </Grid>
    </Grid>}</>
  )
}

export default Utilisateurs