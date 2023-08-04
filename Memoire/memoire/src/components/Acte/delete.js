import React from 'react';
import { Alert,AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Deletee = (props) => {
    const deleteactes=()=>{
        fetch('/actes',{
            method:'DELETE',
            body: JSON.stringify(props.selected),
            headers: {
            'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(result=>{window.location.reload()}).catch(error=>{console.log(error)})
    }
  return (
    <Alert severity="warning"   action={
        <div>
        <Button color="inherit" size="small" onClick={()=>{props.funct(false)}}>
          <CloseIcon/>
        </Button>
        {props.selected.length!=0&&<Button onClick={deleteactes}><CheckIcon/></Button>}
        </div>
      }>
      <AlertTitle>{props.selected.length?'Attention!':'Y a un problem!'}</AlertTitle>
      {props.selected.length?
      <span>Vous étes sur de supprimer <strong>{props.selected.length+"  Actes(s)"}</strong> séléctioné(s)</span>
      :<span>Vous devez selectionné au moins un Actes á supprimer</span>}
    </Alert>
  );
}

export default Deletee;



