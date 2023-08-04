const mongoose=require('mongoose')
const validator=require('validator') 
//patient
 const patientModel = new mongoose.Schema({
    patientId:{
        type: Number,
    },
    nom:{
        type: String,
        required: true,
        minLength: 3,
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
    telephone:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value,'ar-DZ')){
                throw new Error('téléphone au format : 0777123456')
            }
        }
    }
})

//

//Tableau
module.exports=patientModel


