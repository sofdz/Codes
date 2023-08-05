import React from 'react';
import { Alert,AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Deletee = ({deletedpts,setDeleting}) => {
  console.log(deletedpts)
    const deletepts=()=>{
        fetch(process.env.BACK+'/deletePatients',{
            method:'DELETE',
            body: JSON.stringify(deletedpts),
            headers: {
            'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(result=>{document.location.reload()}).catch(error=>{console.log(error)})

    }
  return (
    <Alert severity="warning"   action={
        <div>
        <Button color="inherit" size="small" onClick={()=>{setDeleting(false)}}>
          <CloseIcon/>
        </Button>
        {deletedpts.length!=0&&<Button onClick={deletepts}><CheckIcon/></Button>}
        </div>
      }>
      <AlertTitle>{deletedpts.length?'Attention!':'Y a un problem!'}</AlertTitle>
      {deletedpts.length?
      <span>Vous étes sur de supprimer <strong>{deletedpts.length+"  Patient(s)"}</strong> séléctioné(s)</span>
      :<span>Vous devez selectionné au moins un Patient á supprimer</span>}
    </Alert>
  );
}

export default Deletee;



