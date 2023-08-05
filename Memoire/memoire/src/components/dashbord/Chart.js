import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { useState ,useEffect} from 'react';
import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch/Switch';

function Chartt({date}) {
    const [data,setdata]=useState(null)
    const [init,setinit]=useState(null)
    const [activer,setactiver]=useState(false)
    const getMonth=(num)=>{
            const months = [
                '',
              'Janvier',
              'Février',
              'Mars',
              'Avril',
              'Mai',
              'Juin',
              'Juillet',
              'Août',
              'Septembre',
              'Octobre',
              'Novembre',
              'Décembre'
            ];
            return months[num]
    }
    useEffect(()=>{
        fetch('https://ophtaback.onrender.com/statsRecette', {
            method: 'POST',
            body: JSON.stringify({date:date}),
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res=>{res.json().then(dataa=>{
            setinit(dataa)
            setactiver(true)
        })})
    },[date])
    useEffect(()=>{
        if(!init){return}
        const temp={
            labels:[],
            datasets: [{
              label:'',
              data:[],
              backgroundColor:'',
              borderColor:'',
              borderWidth: 1,
            }
        ]
          }
      if(activer){
        temp.labels=init.labels[1]
        temp.datasets[0].label=init.datasets[1].label
        temp.datasets[0].data=init.datasets[1].data
        temp.datasets[0].backgroundColor=init.datasets[1].backgroundColor
        temp.datasets[0].borderColor=init.datasets[1].borderColor
        setdata(temp)
      }
      else{  
        temp.labels=init.labels[0]
        temp.datasets[0].label=init.datasets[0].label
        temp.datasets[0].data=init.datasets[0].data
        temp.datasets[0].backgroundColor=init.datasets[0].backgroundColor
        temp.datasets[0].borderColor=init.datasets[0].borderColor
         setdata(temp)
  }
    },[activer])
  return (
    <>
{data&&<>
<Bar data={data}/>
<FormControlLabel control={<Switch checked={activer} onChange={(e)=>{e.preventDefault();setactiver(prevs=>!prevs)}}></Switch>} label={activer?"filtrer par mois":"filtrer par jour"}/>
       </>
        }
</>
)
}
export default Chartt