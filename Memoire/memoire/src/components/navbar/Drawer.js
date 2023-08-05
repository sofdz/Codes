import { Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PersonIcon from '@mui/icons-material/Person';
function Drawerr({open,setopen}) {
  const navigate=useNavigate()
  const {user}=useAuth()
    const logout=()=>{
        fetch('https://ophtaback.onrender.com/logout',{
            method:'GET',
            credentials: 'include' ,
            headers: {
            'Content-type': 'application/json; charset=UTF-8'
            }
          }
        ).then(res => //navigate('/Login')
              document.location.reload()
                ).catch(e => console.log(e))
    }
  return (
    <Drawer anchor='right' open={open} onClose={()=>{setopen(false)}}>
    <List>
     {user.role=="Admin"&&<ListItemButton onClick={()=>{navigate('/Utilisateurs');setopen(false)}} sx={{}}>
                 <ListItemIcon>
         <PersonIcon/>
     </ListItemIcon>
     <ListItemText>
       gestion des utilisateurs
     </ListItemText>
     </ListItemButton>}
        <ListItemButton onClick={logout} sx={{}}>
                 <ListItemIcon>
         <LogoutIcon/>
     </ListItemIcon>
     <ListItemText>
       Se déconnecter
     </ListItemText>
     </ListItemButton>
    </List>
    </Drawer>

     
    )
}

export default Drawerr