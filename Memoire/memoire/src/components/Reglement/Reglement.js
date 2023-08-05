import { useState, useEffect } from "react";
import { Grid, Typography} from '@mui/material'
import { DataGrid,GridActionsCellItem } from "@mui/x-data-grid";
import PaidIcon from '@mui/icons-material/Paid';
import Payer from "./Payer";

export default function Reglement() {
    const [Reglements,setReglements] = useState(null)
    const [Reglement,setReglement] = useState(null)
    const [open, setopen] = useState(false)
 useEffect(() => {
        https://ophtaback.onrender.com+'/Reglements').then((res) => {
            res.json().then((data) => {
                console.log(data)
                setReglements(data)
            }).catch(e=>{console.log(e)})
        })
    }, [])
   const payerReg=(reg)=>{
    setReglement(reg);setopen(true)
   }
   const columns = [
    {
        field: 'patient',
        headerName: "Nom complet du patient",
        flex: 1,
        minWidth: 100,
        renderCell:(params)=>(<span>{params.row.consult.patient.nom+" "+params.row.consult.patient.prenom}</span>)
    },
    {
        field: 'num_consult',
        headerName: 'numero de la consultation',
        type:'date',
        flex: 1,
        minWidth: 100,
        renderCell:(params)=>(<span>{params.row.consult.num_consult}</span>)
    },
    { 
        field: 'Date_paiement',
        headerName: 'Date de paiement',
        flex: 1,
        minWidth: 100,
        renderCell:(params)=>{if(params.value){const date=new Date(params.value);{return <span>{date.toLocaleDateString('en-GB', { timeZone: 'UTC' })}</span> }}}
    },
    {
        field: 'montant',
        headerName: 'Montant',
        type:'number',
        flex: 1,
        minWidth: 100,
    },
    {
        field:'etat',
        headerName: 'etat reglement',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'actions',
        headerName: 'payer',
        type: 'actions',
        flex:1,
        sortable: false,
        getActions: (params) => [
          <GridActionsCellItem color="primary" disabled={params.row.etat=='Payé'} icon={<PaidIcon />} onClick={()=>{payerReg(params.row)}} />,
        ]
      }
]
    return (
        <>    
        {Reglements&&
          <Grid container  direction='column' alignContent='center' alignItems='center'>
            <Payer open={open} reglement={Reglement} setopen={setopen}/>
            <Grid item><Typography variant="h2" color='primary'>Reglements</Typography></Grid>
            <Grid item sx={{width:'90%'}}>
                 <DataGrid
                    rows={Reglements}
                    columns={columns}
                    hideFooter
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}/></Grid></Grid>    }
           </>
           )
}