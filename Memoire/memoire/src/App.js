import './App.css';
import Ordonnance from './components/Ordonnance/Ordonnance';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
//import MenuIcon from '@mui/icons-material/Menu'
import Patient from './components/Patients/Patient';
import Medicamenet from './components/Medicaments/Medicament';
import Acte from './components/Acte/Acte';
import Test from './components/FileDattente/FD';
import Nav from './components/navbar/Nav';
import RendezVous from './components/rendezVous/rendezVous';
import Login from './components/Login';
import { useAuth } from './hooks/useAuth';
import VerifAuth from './components/verification_auth/VerifAuth';
import  Home  from './components/home/Home';
import NonAutorise from './components/ErrorComponents/NonAutorise';
import LoginVerif from './components/verification_auth/LoginVerif';
import DossierMedical from './components/DossierMedical/DossierMedical';
import Consultations from './components/Consultation/Consultations';
import Reglement from './components/Reglement/Reglement';
import Utilisateurs from './components/utilisatuers/Utilisateurs';
import Dashbord from './components/dashbord/Dashbord';
import Temp from './components/Template/temp';

/*   <Grid container >
      <Grid item xs={12}><Navbar /></Grid>
      <Grid item xs={2}><LeftMenu /></Grid>
      <Grid container item xs={10} sx={{ marginTop: 2, display: 'flex',justifyContent:'center'}}>
      <Paper elevation={15} sx={{width:'-webkit-fill-available',height:'80vh',alignSelf:'center',marginBottom:'10px',p:1}}>
      <BrowserRouter>
          <Routes>
            <Route path="/patients" element={<Patient position={'relative'}  />} />
            <Route path="/medicaments" element={<Medicamenet sx={{ width: '100vw', height: '100vh' }} />} />
            <Route path='/actes' element={ <Acte position={'relative'} sx={{ width: '100vw', height: '100vh' }} />}/>
            <Route path='/ordonnances' element={ <Ordonnance position={'relative'} sx={{ width: '100vw', height: '100vh' }} />}/>
            <Route path='/filedattente' element={ <Test position={'relative'} sx={{ width: '100vw', height: '100vh' }} />}/>
          </Routes>
        </BrowserRouter>
        </Paper>
      </Grid>
        
    </Grid>*/ 

function App() {

const {user,setuser}=useAuth()
  return (
    <div className="App">
     {user?<Nav/>:null}
          <Routes>
          <Route element={<LoginVerif/>} >
          <Route path="/Login" element={<Login/>} />
          </Route>
           <Route element={<VerifAuth/>} >
            <Route path="/NonAutorisé" element={<NonAutorise titre='Non autorisé' contenu="Vous n'avez pas le droit d'accés pour cette page"/>} />
            </Route>
            <Route element={<VerifAuth roles={['Admin']}/>} >
            <Route path="/Utilisateurs" element={<Utilisateurs/>} />
            <Route path="/" element={<Dashbord/>}/>
            </Route>
            <Route element={<VerifAuth roles={['Medecin','Admin']}/>} >
              <Route path="/templates" element={<Temp/>}/>
            <Route path="/Medicaments" element={<Medicamenet />} />
            <Route path="/Ordonnance" element={<Ordonnance />} />
            <Route path="/DM" element={<DossierMedical />} />
            <Route path="/Consultations" element={<Consultations />} />
            </Route>
            <Route element={<VerifAuth roles={['Comptable','Admin']}/>} >
            <Route path='/Actes' element={ <Acte/>}/>
            <Route path='/Reglements' element={<Reglement/>}/>
            <Route path='/Statistique' element={<Dashbord/>}/>
             </Route>
             <Route element={<VerifAuth roles={['Medecin','Admin','Assistante']}/>} >
            <Route path='/Rendez-vous' element={ <RendezVous/>}/>
            <Route path="/Patients" element={<Patient/>} />
            </Route>
            <Route element={<VerifAuth roles={['Medecin','Admin']}/>} >
            <Route path='/Ordonnances' element={ <Ordonnance  />}/>
            </Route>
            <Route element={<VerifAuth roles={['Medecin','Admin','Assistante']}/>} >
            <Route path='/filedattente' element={ <Test  />}/>
            </Route>
            <Route path="*" element={<NonAutorise titre=' Erreur 404' contenu="Page introuvable"/>} />
          </Routes>
  </div>
  );
}

export default App;
