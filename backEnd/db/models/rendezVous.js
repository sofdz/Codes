const { Schema, default: mongoose, model } = require('mongoose')
const Patient=require('./PatientSc')

//mongoose.connect('mongodb://127.0.0.1:27017/mydb')

const rendezVoussc=new Schema({
date:{
    type:Date,
    required:true,
},
motif:{
    type:String
},
patient:{type:mongoose.Types.ObjectId,ref:'Patient'} 
})
rendezVoussc.index({ patient: 1, date: 1}, { unique: true })
const rendezVous=model('rendezVous',rendezVoussc)
module.exports=rendezVous
