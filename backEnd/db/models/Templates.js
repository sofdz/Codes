const { default: mongoose } = require("mongoose")


const TemplateSc = new mongoose.Schema({
    titre:{
        type: String,
        required: true,
        minLength: 3,
    },
    type:{
        type: String,
        enum:[ 'Orientation', 'Certificat', 'Compte rendu', 'Réponse'],
        required: true
    },
    contenu:{
        type: String,
        required: true
    }
})
const Template = new mongoose.model('Template',TemplateSc)
module.exports= Template