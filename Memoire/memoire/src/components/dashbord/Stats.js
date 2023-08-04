import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box } from '@mui/material';
import Chartt from './Chart';
function Stats() {
    const [date,setdate]=useState(null)
    useEffect(()=>{
     const dateCourante=new Date()
     var month=dateCourante.getMonth()+1
     if(dateCourante.getMonth()<=9){month=`0${month}`}
     console.log(month)
     setdate(`${dateCourante.getFullYear()}-${month}`)
    },[])
  return (
    <>
    <Box style={{boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} >
    {date&&<Chartt date={date} />}
    <input type='month' onBlur={(e)=>{setdate(e.target.value)}} ></input>
    </Box>
    </>
  )
}

export default Stats