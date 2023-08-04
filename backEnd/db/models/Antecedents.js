const mongoose=require('mongoose')
const antecSC=mongoose.Schema({
 designation:{
    type:String,
    unique:true,
    required:true,
    trim:true
 },
 type:{
  type:String,
  enum:['Général','Ophtalmologique']
 }
})
const antecModel=mongoose.model('Antecedent',antecSC)
module.exports=antecModel