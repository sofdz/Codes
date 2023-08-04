import React from 'react'
import { AppBar,Button,IconButton,Stack,Tab,Tabs,Toolbar, Typography } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { useAuth } from '../../hooks/useAuth';
import Drawerr from './Drawer';
import MenuIcon from '@mui/icons-material/Menu';
//<Button size='large' sx={{color:'#ffffff'}} onClick={logout} ><LogoutIcon/></Button>
function Nav() {
    const [opened,setopen]=useState(false)
    const {user}=useAuth()
    const navigate=useNavigate()
    var navElements=[]
     switch(user.role){
        case "Comptable":{
             navElements=["Actes","Reglements","Statistique"]
            break
        }
        case "Medecin":{
            navElements=["Patients", "Rendez-vous", "filedattente","Medicaments"]
           break
       }
       case "Admin":{
        navElements= ["Patients", "Rendez-vous", "filedattente","Medicaments","Actes","Reglements","Statistique"]
       break
   }
   case "Assistante":{
    navElements=["Patients", "Rendez-vous", "filedattente"]
   break
}                
     }
    const location=useLocation()
    const path=location.pathname.replace('/','')
    const init=navElements.findIndex(element=>element==path)
    const [valuee,setvalue]=useState(init)
    const handlechange=(e,newvalue)=>{
        e.preventDefault()
        setvalue(newvalue)
     }

      return (
<AppBar position='static'>
    <Toolbar>
    <IconButton size='large' aria-label='LOGO' color='inherit'>
        <RemoveRedEyeIcon />
    </IconButton>
    <Tabs textColor='inherit' value={valuee} sx={{marginLeft:'auto'}} indicatorColor="secondary" onChange={handlechange}>
    {navElements.map((element,index)=>(<Tab sx={{color:'white'}} label={element} component={Link}  to={'/'.concat(element)} key={index} value={index}/>))}
    </Tabs>
    <Button size='large' sx={{color:'#ffffff'}} onClick={()=>setopen(true)}  ><MenuIcon/></Button>
    <Drawerr open={opened} setopen={setopen}/>
    </Toolbar>
    </AppBar >)
}
export default Nav