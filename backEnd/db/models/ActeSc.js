const mongoose=require('mongoose')
const ActeSc = new mongoose.Schema({
    nomActe:{
        type: String,
        required: true,
        minLength: 3,
    },
    tarif:{
        type: Number,
        required: true,
    }
    ,
    cache:{
        type:Boolean,
        default:false
    }
})

const Acte = mongoose.model('Acte',ActeSc)
module.exports=Acte