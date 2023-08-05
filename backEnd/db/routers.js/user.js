const express=require('express')
const mongoose=require('mongoose')
const User=require('../models/users')
const jwt=require('jsonwebtoken')
const passport=require('passport')
require('../controllers/passport')
const UserRouter=new express.Router()
UserRouter.post('/createUser',async (req,res)=>{
    try{
    const utilisateur=new User(req.body)
    const newUser=await utilisateur.save({ validateBeforeSave: true })
       res.status(201).send(newUser)
    }
   catch(e){
      console.log(e)
    res.status(500).send(e)
   }
})
UserRouter.get('/estAuthentifie',passport.authenticate('jwt',{session:false}),async (req,res)=>{
   try{
   const {_id,nom_utilisateur,role,nom,prenom}=req.user
      res.json({user:{_id,nom_utilisateur,nom,prenom,role},est_authentifie:true})
   }
  catch(e){
   res.status(401).send({est_authentifie:false})
  }
})
UserRouter.post('/login',passport.authenticate('local',{session:false}),async (req,res)=>{
   try{
 if(req.isAuthenticated()){
   const {_id,nom_utilisateur,role,nom,prenom}=req.user
   const token=jwt.sign({sub:_id,role},'salah_hafnaoui_secret_key',{expiresIn:'10h'})
   console.log('in')
   res.cookie('access_token',token,{sameSite:'none',httpOnly:true,secure:true})
   res.status(200).json({estAuthentifie:true,utilisateur:{nom_utilisateur,role,nom,prenom}})
 }
   }
   catch(e)
{res.status(400).send(e)}
})
//,
UserRouter.get('/logout',passport.authenticate('jwt',{session:false}),async (req,res)=>{
  res.clearCookie('access_token')
   res.json({nom_utilisateur:"",est_authentifie:false,role:""})
})
UserRouter.get('/userss',passport.authenticate('jwt',{session:false}),async (req,res)=>{
  try{
 const allusers=await User.find({})
 res.status(201).send(allusers)
  }catch(e){
   console.log(e)
 res.status(400).send(e)
  }

 })
UserRouter.delete('/deleteUser/:id',(req,res)=>{
    try{
     const user= User.findByIdAndDelete(req.params.id)
       res.status(201).send(user)
    }
   catch(e){
    res.status(500).send(e)
   }
})
UserRouter.patch('/updateUser/:id',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
      const mdpjust=await req.user.compare_MDP(req.body.mdpAdmin)
         if(!mdpjust){
            res.send({titre:"erreur",contenu:"mot de passe incorrect",type:"error"})
         }
         else{        const updates=Object.keys(req.body.user)
        const user= await User.findById(req.params.id)
        updates.map(update=>user[update]=req.body.user[update])
      const newu=await user.save({validateBeforeSave:true})
       res.status(201).send({titre:"success",contenu:"utlisateur a été modifié avec success",type:"success"})}
    }
   catch(e){
    res.status(500).send(e)
   }
})
module.exports=UserRouter