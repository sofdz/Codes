const express=require('express')
const Patient=require('../models/PatientSc')
const rendezVous=require('../models/rendezVous')
const mongoose=require('mongoose')
const rendezVousRoute=new express.Router()
const moment=require('moment-timezone')
const passport=require('passport')
require('../controllers/passport')
rendezVousRoute.post('/createRdv',passport.authenticate('jwt',{session:false})
,async (req,res)=>{
    try{
        const rdv=req.body
  const newrdv= new rendezVous({date:rdv.date,patient:rdv.patient,motif:rdv.motif})
     await newrdv.validate()
  const result=await newrdv.save()
  res.status(200).send({titre:"Succes",contenu:"Rendez-vous ajouté avec succes",type:"succes"})

}
        catch(e){
          res.status(400).send({titre:"error",contenu:e,type:"error"})
        }
})
rendezVousRoute.get('/rendezVous',passport.authenticate('jwt',{session:false})
,async (req,res)=>{
    try{
      const all_rdvs=await rendezVous.find({}).populate('patient').exec()
      res.status(200).send(all_rdvs)
    }
    catch(e){
    res.status(400).send(e)
    }
})
rendezVousRoute.delete('/deleteRdv',passport.authenticate('jwt',{session:false})
,async (req,res)=>{
    try{
      const rdvs_supp=await rendezVous.deleteMany({_id:{$in:req.body}})
      res.status(200).send({titre:"Succes",contenu:"Rendez-vous supprimé avec succes",type:"succes"})
    }
    catch(e){
      console.log(e)
    res.status(400).send({titre:"erreur",contenu:e,type:"error"})
    }
})
rendezVousRoute.patch('/updateRdv/:id',passport.authenticate('jwt',{session:false})
,async (req,res)=>{
    try{
      const rdv=await rendezVous.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true })
      res.status(200).send({titre:"Succes",contenu:"Rendez-vous modifié avec succes",type:"succes"})
    }
    catch(e){
    res.status(400).send(e)
    }
})
rendezVousRoute.post('/rendezVousDate',passport.authenticate('jwt',{session:false})
,async (req,res)=>{
    try{
        const data=req.body
      const rdv=await rendezVous.find({$and:[{date:data.date},{patient:data.patient}]})
      console.log(rdv)
      res.status(200).send(rdv)
    }
    catch(e){
    res.status(400).send(e)
    }
})

module.exports=rendezVousRoute
