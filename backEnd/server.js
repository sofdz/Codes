const express=require('express')
const fileDattenteRoute = require('./db/routers.js/fileDattente');
const rendezVousRoute = require('./db/routers.js/rendezVousRouter');
const PatientRouter = require('./db/routers.js/patients');
const MedicamentRouter = require('./db/routers.js/MedicamentRouter');
const OrdonnanceRouter = require('./db/routers.js/OrdonnanceRouter');
const UserRouter = require('./db/routers.js/user');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const ActeRouter = require('./db/routers.js/ActeRouter');
const ConsultationRouter = require('./db/routers.js/ConsultRouter');
const TemplateRouter = require('./db/routers.js/TemplateRouter');
const AntecRouter = require('./db/routers.js/AntecRouter');
const RegRouter = require('./db/routers.js/RegRouter');
const User = require('./db/models/users');
const Ordonnance = require('./db/models/OrdonnanceSc');
const formidable = require('formidable')
const mongoose = require('mongoose')
const app=express()
app.use(
    cors({
        origin: "https://ophta-4f4blut6p-sofdz.vercel.app",
        methods:["POST","GET","PUT","DELETE"],
        credentials: true
    })
    ); 
    /*app.use(function(req, res, next) {
        res.header('Content-Type', 'application/json;charset=UTF-8')
        res.header('Access-Control-Allow-Credentials', true)
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
      })*/

//app.use(express.json())
/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})*/
mongoose.connect('mongodb://sofdz:moi1999@ac-leoaajk-shard-00-00.3rm2rif.mongodb.net:27017,ac-leoaajk-shard-00-01.3rm2rif.mongodb.net:27017,ac-leoaajk-shard-00-02.3rm2rif.mongodb.net:27017/newdb?replicaSet=atlas-mc1sdx-shard-0&ssl=true&authSource=admin').then((e)=>(console.log("connected to DB"))).catch(e=>console.log('error :' +e))

app.use(cookieParser())
app.use(express.json())
//app.use(cors())
app.use(fileDattenteRoute)
app.use(rendezVousRoute)
app.use(PatientRouter)
app.use(MedicamentRouter)
app.use(OrdonnanceRouter)
app.use(UserRouter)
app.use(ActeRouter)
app.use(MedicamentRouter)
app.use(ConsultationRouter)
app.use(TemplateRouter)
app.use(AntecRouter)
app.use(RegRouter)

const port = 8080 || process.env.PORT

app.listen(port,error=>{ 
    if(error){
        console.log(`the port 8000`)
    }
})