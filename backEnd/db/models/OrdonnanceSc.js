const mongoose=require('mongoose')
const Patient=require('./PatientSc')
const Medicament=require('./MedicamentSc')
const Consultaion=require('./consultation')
const OrdonnanceSc = new mongoose.Schema({
    consultation: {
        type: mongoose.Types.ObjectId,
        ref: 'Consultation',
    },
    typeOrd: {
        type: String,
        enum: ['Prescription', 'Orientation', 'Certificat', 'Compte rendu', 'Réponse', 'Correction'],
        required:true
    
    },
    medicaments: [{
        medicament:{type:mongoose.Types.ObjectId,ref:"Medicament"},
        posologie:{type:String}
    }],
    contenu: {
        type: String,
    },})
 /*OrdonnanceSc.pre('save',async function(next){
    var arrayy=[]
    await Promise.all( this.medicaments.map(async (med,index)=>{if(!med.posologie){
       const medd=await Medicament.findById(med.medicament)
       this.medicaments[index].posologie=medd.posologie
    }})   ) 
console.log(this.medicaments);  next()
 })*/
const Ordonnance = mongoose.model('Ordonnance', OrdonnanceSc)
module.exports= Ordonnance