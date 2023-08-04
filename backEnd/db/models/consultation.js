const mongoose=require('mongoose')
const Patient=require('./PatientSc')
const User=require('./users')
const Acte=require('./ActeSc')
const Reglement=require('./ReglementsSc')
const consultSC=mongoose.Schema({
  patient:{type:mongoose.Types.ObjectId,ref:'Patient',required:true},//la conception la plus juste est de garder le dossier medicale pas le patient sinon on supprime la collection dossier medical et on laisse que le patient
  medecin:{type:mongoose.Types.ObjectId,ref:'User',required:true},
  date_consult:{type:Date,default:function(){
    var date=new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}Z`
  }},
  motif:{type:String},
  liste_actes:[{type:mongoose.Types.ObjectId,ref:'Acte'}],
  reg:{type:mongoose.Types.ObjectId,ref:"Reglement"},
  num_consult:{
    type:Number
   },
  DP:{type:Number},
  OD:{
    refraction:{
     s:{type:Number},//sphere
     c:{type:Number},//cylindre
     a:{type:Number}//axe
    },
    correction:{
      s:{type:Number},//sphere
      c:{type:Number},//cylindre
      a:{type:Number}//axe
     },
     TO:{type:Number},//tonus oculaire
     PCH:{type:Number},//pachymetrie
     remarqueLaf:{type:String},//reqmraque lampe a fonte 
     remarqueFo:{type:String},//remarque fond d'oeil
     addition:{type:Number}
  },
  OG:{
    refraction:{
     s:{type:Number},//sphere
     c:{type:Number},//cylindre
     a:{type:Number}//axe
    },
    correction:{
      s:{type:Number},//sphere
      c:{type:Number},//cylindre
      a:{type:Number}//axe
     },
     TO:{type:Number},//tonus oculaire
     PCH:{type:Number},//pachymetrie
     remarqueLaf:{type:String},//reqmraque lampe a fonte 
     remarqueFo:{type:String},//remarque fond d'oeil  
     addition:{type:Number}
    },
    dilatation:{
      type_dil:{
        type:String},
      correctionD:{
        s:{type:Number},//sphere
        c:{type:Number},//cylindre
        a:{type:Number}//axe
       },
       correctionG:{
        s:{type:Number},//sphere
        c:{type:Number},//cylindre
        a:{type:Number}//axe
       },
       remarque_dil:{type:String}
    }
    })
    consultSC.methods.calculerMontant=async function(){
      var montant=0
       await Promise.all(this.liste_actes.map(async element => {
        const acte=await Acte.findById(element._id)
        montant=montant+acte.tarif
      }))
      return montant;
    }
    consultSC.pre('save',async function(next){
      const maxId=await consultModel.findOne({patient:this.patient}).sort('-num_consult')
       if(!maxId){this.num_consult=1}
       else{
           this.num_consult=maxId.num_consult+1
       }
       next()
   })
   consultSC.post('save',async function(next){
    try{
    var newReg=new Reglement({consult:this._id})
    newReg.montant=await this.calculerMontant()
    await newReg.save()
    await consultModel.updateOne({_id:this._id},{reg:newReg._id})
    console.log(this)
    }catch(e){
      console.log(e)
      next()
    }
 })
 consultSC.post('findOneAndUpdate',async function(result){
  const reglement=await Reglement.findByIdAndUpdate(result.reg,{montant:await result.calculerMontant()})
})

 //n'oublier pas quand le medecin modifie les actes d'une consultation pas encore payée de modifier le montant du reglement avec pre updateOne hook
const consultModel=mongoose.model('Consultation',consultSC)
module.exports=consultModel