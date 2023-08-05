import React, { useEffect,useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
const columnsG = [
    {
        field: 'designation',
        headerName: "Généraux",
        flex: 1,
        minWidth: 100,
    }]
    const columnsO = [
      {
          field: 'designation',
          headerName: "Ophtalmologiques",
          flex: 1,
          minWidth: 100,
      }]
function AntecedMed({filterModel,antecdPat,selected,setSelected}) {
    const [anteceds,setAnteceds]=useState([])
    useEffect(()=>{
      https://ophtaback.onrender.com+'/Antecedents').then(res=>{res.json().then(data=>{
        //setAnteceds(data)
       setAnteceds(data.filter(element=>!antecdPat.includes(element._id)))
      })})
    },[])
  return (
    <>
       {anteceds.length!=0&&
    <><Grid item xs={6} height='45%'>
          <DataGrid
            columns={columnsG}
            rows={anteceds.filter(anteced => anteced.type == 'Général')}
            //getRowId={(row) => row.lastModified}
            hideFooter
            columnHeaderHeight='20px'
            sx={{}}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(items) => { setSelected(prevs=>({...prevs,gener:items})) }}
            filterModel={filterModel}
            rowHeight={20}
            getRowId={(row=>(row._id))} />
        </Grid><Grid item xs={6} height='45%'>
            <DataGrid
              filterModel={filterModel}
              checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(items) => {  setSelected(prevs=>({...prevs,ophtal:items}))}}
              columns={columnsO}
              rows={anteceds.filter(anteced => (anteced.type == 'Ophtalmologique'))}
              rowHeight={20}
              //getRowId={(row) => row.lastModified}
              hideFooter
              getRowId={(row=>(row._id))}
              columnHeaderHeight='20px'
              sx={{}} />
          </Grid></>}
               </>
  )
}

export default AntecedMed