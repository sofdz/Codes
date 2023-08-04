import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    props.funct(false)
    setOpen(false);
    
  };

  return (
    <div>
      <Dialog
        open={props.existed}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.message=='Rendez-Vous creé'||props.message=='Rendez-Vous modifié'?'SUCCES':"ERREUR"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}><CloseIcon /></Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}