const mongoose=require('mongoose')
const MedicamentSc = new mongoose.Schema({
    designation:{
        type: String,
        required: true,
        minLength:3
    },
    posologie:{
        type: String,
        required: true,
        minLength:3,
    },
    cache:{
        type: Boolean,
        required: true,
        default:()=>false
    }
})
module.exports=mongoose.model('Medicament',MedicamentSc)

