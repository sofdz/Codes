import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { useState ,useEffect} from 'react'
import { Line } from 'react-chartjs-2/dist'
import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch/Switch';
function ConsultChart() {
    const [date,setdate]=useState(null)
    const [data,setdata]=useState(null)
    const [init,setinit]=useState(null)
    const [activer,setactiver]=useState(null)
    useEffect(()=>{
     const dateCourante=new Date()
     var month=dateCourante.getMonth()+1
     if(dateCourante.getMonth()<=9){month=`0${month}`}
     setdate(`${dateCourante.getFullYear()}-${month}`)
    },[])
    useEffect(()=>{
        if(!date){return}
        fetch('https://ophtaback.onrender.com/consultStat',{
            method: 'POST',
            body: JSON.stringify({date:date}),
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res=>{res.json().then(dataa=>{
            console.log(dataa)
            setinit(dataa)
            setactiver(true)
                })})},[date])
   useEffect(()=>{
                    if(!init){return}
                    const temp={
                        labels:[],
                        datasets: [{
                          label:'',
                          data:[],
                          fill: false,
               borderColor: '',
                tension: 0
                        }
                    ]
                      }
                  if(activer){
                    temp.labels=init[2]
                    temp.datasets[0].label='Nombre du consultation du mois  '
                    temp.datasets[0].data=init[3]
                    temp.datasets[0].borderColor='rgb(75, 192, 192)'
                    temp.datasets[0].tension=0.2
                    setdata(temp)
                  }
                  else{  
                    temp.labels=init[0]
                    temp.datasets[0].label='Nombre du consultation par Jour '
                    temp.datasets[0].data=init[1]
                    temp.datasets[0].borderColor='rgb(192, 192, 75)'
                    temp.datasets[0].tension=0.1
                    setdata(temp)
              }
                },[activer])
  return (
    <>
 {data&&<Line data={data}/>}
 <FormControlLabel control={<Switch checked={activer} onChange={(e)=>{e.preventDefault();setactiver(prevs=>!prevs)}}></Switch>} label={activer?"filtrer par mois":"filtrer par jour"}/>
<input type='month' onBlur={(e)=>{setdate(e.target.value)}} ></input>

    </>
  )
}

export default ConsultChart