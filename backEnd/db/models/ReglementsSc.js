const mongoose=require('mongoose')
const Consultation=require('./consultation')
const RegSC=mongoose.Schema({
   consult:{
    type:mongoose.Types.ObjectId,
    ref:'Consultation'
   },
   montant:{
    type:Number,
   },
   Date_paiement:{
   type:Date,
   },
   etat:{
    type:String,
    enum:['Payé','NonPayé'],
    default:"NonPayé"
   }
}
)
const regModel=mongoose.model('Reglement',RegSC)
module.exports=regModel
