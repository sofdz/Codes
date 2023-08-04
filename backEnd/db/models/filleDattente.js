const mongoose=require('mongoose')
const Patient=require('./PatientSc')
const fileDattentesc=new mongoose.Schema({
    patient:[{type:mongoose.Types.ObjectId,ref:'Patient'}],
})
const fileDattente=mongoose.model('fileDattente',fileDattentesc)
module.exports=fileDattente


