import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import { useState } from 'react'

function AntecedPat({antecedents,setDeletedAnteceds}) {
    const [data,setdata]=useState([])
    const columns= [
        {
            field: 'designation',
            headerName: "Antecedent",
            flex: 1,
            minWidth: 100,
        },{
            field: 'type',
            headerName: "Type",
            flex: 1,
            minWidth: 100,
        },]
        useEffect(()=>{
            fetch('/AntecedentsPat', {
                method: 'POST',
                body: JSON.stringify(antecedents),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res =>{res.json().then(data=>{console.log(data);setdata(data)})})
        },[])
        
  return (
    <DataGrid
              columns={columns}
              rows={data}
              rowHeight={20}
              //getRowId={(row) => row.lastModified}
              hideFooter
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={items => {setDeletedAnteceds(items) }}
              getRowId={(row=>(row._id))}
              columnHeaderHeight='20px'
              sx={{}} />
  )
}

export default AntecedPat