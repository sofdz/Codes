import React from 'react'
import { Doughnut } from 'react-chartjs-2/dist'
import {Chart as ChartJS} from 'chart.js/auto'
import { useState ,useEffect} from 'react';

function Age() {
    const [data,setdata]=useState(null)
    const[Patients,setPatients]=useState(null)
    useEffect(()=>{
        if(!Patients){return}
        const bebes=Patients.filter(pat=>pat.age<2)
        const enfant=Patients.filter(pat=>pat.age>=2&&pat.age<18)
        const adulte=Patients.filter(pat=>pat.age>=18&&pat.age<55)
        const agé=Patients.filter(pat=>pat.age>=55)
        setdata({
            labels:['nouveaux née','Enfant','Adulte','Senior'],
            datasets: [{
              label:`Partition des patients par rapport a l'age`,
              data:[bebes.length,enfant.length,adulte.length,agé.length],
              backgroundColor:['rgba(255, 99, 132, 0.2)','rgba(132, 99, 255, 0.2)','rgba(99, 255, 99, 0.2)','rgba(255,0,255, 0.2)',],
              borderColor: 
                ['rgb(255, 99, 132)','rgb(132, 99, 255)','rgb(99,255,99)','rgb(255,0,255)',],
            }]
          })
    },[Patients])
    useEffect(()=>{
        fetch('/Patients').then(res=>{res.json().then(data=>{
setPatients(data)        
        })})
    },[])
  return (
    <>
    {data&&<Doughnut data={data}/>}
    </>
  )
}

export default Age