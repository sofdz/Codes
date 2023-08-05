import {
	Container,
	Button,
	Grid,
	Paper,
	TextField,
	IconButton,
	InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from '@mui/icons-material/Login';
import React, { useState,useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Logout } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom/dist";

const Login = () => {
const {user,setuser}=useAuth()


const navigate=useNavigate()

const [values, setValues] = useState({
	nom_utilisateur: "",
	MDP: "",
	showPass: false,
});
const handlePassVisibilty = () => {
	setValues({
		...values,
		showPass: !values.showPass,
	});
};
const handlechange=(e)=>{
	e.preventDefault()
	setValues({...values,[e.target.name]:e.target.value})
}
const naviagteUser=(user)=>{
 switch(user){
	 case "Comptable":{
     navigate('/Actes')
	 break;
	 }
	 default:{
		navigate('/Patients')
        break;
	 }
 }
}
const login=(e)=>{
	e.preventDefault()
	const object={}
	object.nom_utilisateur=values.nom_utilisateur
	object.MDP=values.MDP
	fetch('https://ophtaback.onrender.com/login',{
		method:'POST',
		credentials: 'include' ,
		body: JSON.stringify(object),
		headers: {
		'Content-type': 'application/json; charset=UTF-8'
		}
	  }).then(res=>{
		if(res.status==401){
			console.log('imposible de sauthentifier')
		}
		else{
		res.json().then(data=>{setuser(data.utilisateur);naviagteUser(data.utilisateur.role)})}}).catch(error=>{console.log(error)})}
	return (
		<div>
<Container maxWidth="sm" >
<Grid
	container
	spacing={2}
	direction="column"
	justifyContent="center"
	style={{ minHeight: "100vh" }}    
>
<Paper elevation={15} sx={{ padding: 5,width:"70%",minHeight: "35vh"} } >
<form onSubmit={login}>
<Grid container direction="column" spacing={4} >
	<Grid item>
		<TextField
			type="text"
            fullWidth	
			name="nom_utilisateur"		
			label="nom d'utilisateur"
			variant="outlined"
			placeholder=""
			required
			onChange={handlechange}
		/>
	</Grid>

	<Grid item>
	<TextField
		type={values.showPass ? "text" : "password"}
		label="Mot de passe"
		name="MDP"
        fullWidth
        placeholder=""
		variant="outlined"
		required
		onChange={handlechange}
		InputProps={{
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						onClick={handlePassVisibilty}
						aria-label="toggle password"
						edge="end"
                    
					>
						{values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</InputAdornment>
			),
		}}
	/>
	</Grid>

	<Grid item style={{ marginTop: '4vh' }}>
	<Button type="submit" fullWidth variant="contained" sx={{color:"#2d92b3"}} style={{borderRadius:"10px"}}  >
	<LoginIcon sx={{ fontSize: 29,color:"#cff3ff"}}/>
	</Button>
	
	</Grid>
	

</Grid>
</form>
</Paper>
</Grid>
</Container>
		</div>
	);
};

export default Login;