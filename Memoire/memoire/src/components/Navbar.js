import { Toolbar, Button, IconButton, Typography, Box, Container,AppBar } from '@mui/material'

import { useState } from 'react';

//Icons
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import TodayIcon from '@mui/icons-material/Today'
import HourGlassBottomIcon from '@mui/icons-material/HourglassBottom'
import MedicationLiquidRoundedIcon from '@mui/icons-material/MedicationLiquidRounded';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'

export default function Navbar() {

  const [menuItems, setMenuItems] = useState(["Patients", "Rendez-vous", "File d'attente","Medicaments","Actes","filedattente"])
  const menuIcon = function (item) {
    switch (item) {
      case "Patients":
        return (<PersonIcon sx={{ margin: "4px" }} />)
      case "Medicaments":
        return (<MedicationLiquidRoundedIcon sx={{ margin:"4px"}} />)
      case "Rendez-vous":
        return (<TodayIcon sx={{ margin: "4px" }} />)
      case "File d'attente":
        return (<HourGlassBottomIcon sx={{ margin: "4px" }} />)
      case "Actes":
        return(<CurrencyExchangeIcon sx={{margin:"4px"}} />)

      default:
        return ("error!")
    }
  }

  
  return (
    <>
      <AppBar  open={true} sx={{alignSelf:'flex-start', position:'relative',width:'100vw',background: "#40B1FF", minHeight: '50px', height: '64px', boxShadow: '2px 2px 5px grey' }}>
        <Container sx={{ minHeight: '50px', height: '50px' }}>
          <Toolbar sx={{ alignSelf:'flex-start' ,  justifyContent: "center", minHeight: '40px', height: '50px' }} >

            
            <Box color={'white'}  sx={{justifyContent:'center',width:'100%', minHeight: '50px' }}>

              {menuItems.map((item) => (
                <Button href={'/'.concat(item==="Rendez-vous" ? "rendezvous":item).toLocaleLowerCase()} variant='outlined' size='small' sx={{ margin: "0 2vw 14px 2vw ", color: "#ffffff", borderColor: "#84c8e1", width: "150px", boxShadow: "1px 1px 5px grey" }} >
                  <Typography>{menuIcon(item)}{item}</Typography>
                </Button>
              ))}
              
              

            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Container>
      </Container>
    </>
  )

}