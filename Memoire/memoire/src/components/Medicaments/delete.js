import React from 'react';
import { Alert,AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Deletee = (props) => {
    const deletemeds=()=>{
        fetch(process.env.BACK+'/medicaments',{
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
        {props.selected.length!=0&&<Button onClick={deletemeds}><CheckIcon/></Button>}
        </div>
      }>
      <AlertTitle>{props.selected.length?'Attention!':'Y a un problem!'}</AlertTitle>
      {props.selected.length?
      <span>Vous étes sur de supprimer <strong>{props.selected.length+"  Medicament(s)"}</strong> séléctioné(s)</span>
      :<span>Vous devez selectionné au moins un Medicament á supprimer</span>}
    </Alert>
  );
}

export default Deletee;



