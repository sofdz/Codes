import React from 'react';
import { Alert,AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Alertsupp = (props) => {
    const deletePatient=()=>{props.delete(props.patient._id);props.funct(false)}
  return (
    <Alert severity="warning"   action={
        <div>
        <Button color="inherit" size="small" onClick={()=>{props.funct(false)}}>
          <CloseIcon/>
        </Button>
        <Button onClick={deletePatient}><CheckIcon/></Button>
        </div>
      }>
      <AlertTitle>Attention!</AlertTitle>
      Vous étes sur de supprimer le patient <strong>{props.patient.nom+" "+props.patient.prenom}</strong> de la file d'attente
    </Alert>
  );
}

export default Alertsupp;