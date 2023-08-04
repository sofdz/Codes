import React from 'react';
import { Alert,AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Deletee = (props) => {
    const deleterdvs=()=>{
        fetch('/deleteRdv',{
            method:'DELETE',
            body: JSON.stringify(props.rdvs),
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
        {props.rdvs.length!=0&&<Button onClick={deleterdvs}><CheckIcon/></Button>}
        </div>
      }>
      <AlertTitle>{props.rdvs.length?'Attention!':'Y a un problem!'}</AlertTitle>
      {props.rdvs.length?
      <span>Vous étes sur de supprimer <strong>{props.rdvs.length+"  Rendez-Vous"}</strong> séléctionés</span>
      :<span>Vous devez selectionné au moins un Rendez-Vous á supprimer</span>}
    </Alert>
  );
}

export default Deletee;



