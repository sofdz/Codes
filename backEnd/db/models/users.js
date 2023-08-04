const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const userSC=mongoose.Schema({
   nom:{
      type:String,
       required:true
            },
   prenom:{
    type:String,
   required:true
    },
    nom_utilisateur:{
     type:String,
     unique:true,
     required:true

    },
 telephone:{
     type:String,
     unique:true,
     required:true,
     validate(value){
        if(!validator.isMobilePhone(value,'ar-DZ')){
           throw new Error('numero de telephone invalide vous devez suivre ce format :"+213xxxxxxxxx')
        }
     }
  },
  MDP:{
     type:String,
     required:true,
     trim:true,
  },
  role:{type:String,required:true,enum:['Assistante','Medecin','Comptable','Admin']}
  })
  userSC.methods.compare_MDP=async function(mdp){
     try{
     const mdb_juste=await bcrypt.compare(mdp,this.MDP)
      return mdb_juste
     }
     catch(e){
      return e
     }
  }
  userSC.pre('save',async function(next){
   const user=this
   if(user.isModified('MDP')){
      user.MDP=await bcrypt.hash(user.MDP,8)
   }
      next()
  })
  
const User=mongoose.model('User',userSC)
   module.exports=User
   