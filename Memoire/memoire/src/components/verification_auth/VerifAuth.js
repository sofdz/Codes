import React from 'react'
import { useLocation,Navigate ,Outlet} from 'react-router-dom/dist'
import { useAuth } from '../../hooks/useAuth'
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
function VerifAuth(props) {
    const {user,loading}=useAuth()
    const location=useLocation()
 
          /*roles.includes(user.role)?<NonAutoriseé/>:user?<Outlet/>:<Navigate to='/Login'/>*/
          /*!user?<Navigate to='/Login'/>:roles.includes(user.role)?<Outlet/>:<Navigate to='/NonAutorisé' state={{from:location}} replace/>*/
          if(!loading){
            return  <Box sx={{ width: '100%' }}>
                   <LinearProgress />
          </Box>
          }
          if(props.roles){
               return !user?<Navigate to='/Login'/>:props.roles.includes(user.role)?<Outlet/>:<Navigate to='/NonAutorisé' state={{from:location}} replace/>
          }else{
            return user?<Outlet/>:<Navigate to='/Login'/>
          }
}

export default VerifAuth