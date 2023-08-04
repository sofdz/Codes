const mongoose=require('mongoose')
const validator=require('validator') 
const rendezVous = require('./rendezVous')
const fileDattente=require('./filleDattente')
const Antecedent=require('./Antecedents')
mongoose.connect('mongodb://127.0.0.1:27017/newdb')
//const {generateId}=require('./functions')
//import * as sequence from 'mongoose-sequence'

const opts = { toJSON: { virtuals: true } };

const PatientSc = new mongoose.Schema({
    nom:{
        type: String,
        required: true,
        minLength: 3,
    },
    id:{
     type:Number
    },
    prenom:{
        type: String,
        required: true,
        minLength: 3,
    },
    dateN:{
        type: Date,
        required: true,
    },
    sexe:{
        type:String,
        enum:['Homme','Femme']
    },
    adresse:{
        type:String
    },
    telephone:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value,'ar-DZ')){
                throw new Error('téléphone au format : 0777123456')
            }
        }
    },
    antecedents:[{type:mongoose.Types.ObjectId,ref:'Antecedent'}],
    pieces: [{
        nomFichier: String,
        fichier: String
    }]
},opts)
PatientSc.virtual('age').get(function(){
  const dateCourante=new Date()
  const ageEnMiliSecondes=dateCourante-this.dateN
  return Math.floor(ageEnMiliSecondes/(1000*60*60*24*365))
})
PatientSc.pre('save',async function(next){
   const maxId=await Patient.findOne().sort('-id')
    if(!maxId){this.id=1}
    else{
        this.id=maxId.id+1
    }
    next()
})
PatientSc.pre('deleteMany',async function(next){
    const ids = this.getFilter()["_id"]["$in"]   
    //supprimer tous les rdvs des patients qui on ete supprimés 
      const rdvs=await rendezVous.deleteMany({patient:{$in:ids}})
      //supprimer tous les patients qui ont ete supprimés de la fila d'attante
      const fd=await fileDattente.findOne()
      fd.patient=fd.patient.filter(pat=>ids.includes(pat))
      console.log(fd.patient)
         await fd.save()
     next()
 })
const Patient = mongoose.model('Patient',PatientSc)
module.exports=Patient


