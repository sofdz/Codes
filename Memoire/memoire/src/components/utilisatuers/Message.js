import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

function Message({open,setopen,titre,contenu,type}) {
  return (
    <Dialog open={open} onClose={()=>{setopen(false)}}>
    <DialogTitle  sx={{color:type=='error'?'#e57373':'#03a9f4'}}>{titre}</DialogTitle>
    <DialogContent>{contenu}</DialogContent>
    <DialogActions><Button onClick={()=>{setopen(false)}}><CloseIcon/></Button></DialogActions>
    </Dialog>
  )
}
export default Message