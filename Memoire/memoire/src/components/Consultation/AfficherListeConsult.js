import React, { useState,useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import ModifConsult from './ModifConsult'

function AfficherListeConsult({Pat,newconsult,setnewconsult}) {
  const setnewconsult2=(prop)=>{setnewconsult(prop)}
    const [consultations,setConsultation]=useState([])
    const [modified,setmodified]=useState(null)
    const [selected,setSelected]=useState([])
    const [openmodified,setopenmodified]=useState(false)
    useEffect(()=>{
     if(newconsult){setopenmodified(true)}
    },[])
    const columns=[
        {
            field: 'num_consult',
            headerName: 'Numero du consultation',
            flex:1,
        },
        {
          field: 'medecin',
          headerName: 'Dr',
          flex:1,
          renderCell:(params)=>(<span>{params.value.nom+" "+params.value.prenom}</span> )},
        {
            field: 'date_consult',
            headerName: 'Date',
            flex:1,
            renderCell:(params)=>{const date=new Date(params.value);{return <span>{date.toLocaleDateString('en-GB', { timeZone: 'UTC' })}</span> }}
          },
          {
            field: 'motif',
            headerName: 'Motif',
            flex:1
          },
    ]
    useEffect(
        ()=>{
            fetch('/getConsultations//'.concat(Pat._id)).then(res=>{res.json().then(data=>{console.table(data);setConsultation(data)})})
        }
        ,[])
  return (
    <>
    <DataGrid
    rows={consultations}
    columns={columns}
    density='compact'
    hideFooter
    sx={{ height: '-webkit-fill-available', width: '100%',overflowX: 'scroll'  }}
    columnHeaderHeight='20px'
    getRowId={(row)=>(row._id)}
    checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(items) => { setSelected(items) }}
    onRowDoubleClick={(row)=>{setmodified(row.row);setopenmodified(true)}}
/>
{newconsult?<ModifConsult consultation={newconsult} setconsult={setnewconsult2} open={openmodified} setopenmodified={setopenmodified} patient={Pat} />:
modified&&<ModifConsult consultation={modified} open={openmodified} setconsult={setnewconsult2} setopenmodified={setopenmodified} patient={Pat} />}

</>
  )
}

export default AfficherListeConsult