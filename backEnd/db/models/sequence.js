const mongoose=require('mongoose')
const sequence=new mongoose.Schema({
    id:{type:String},
   seq:{type:Number,default:1}
})
module.exports=mongoose.model('Sequence',sequence)