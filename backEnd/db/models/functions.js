const mongoose=require('mongoose')
const {models} =require('./functionModels.js')
let Patient2 = mongoose.model('Patient2',models[0],'patients')
 async function generateId(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/taskapp')
        let max = 0

        let patients = await Patient2.find({})
        //console.log(patients)
        let ids = []
        patients.map((p)=>{
            ids.push(p.patientId)
            if(max<p.patientId){
                max = p.patientId
            }
        })
       return (max+1)
    }catch (e){
        console.log(e)
    }
    
}
module.exports=generateId

