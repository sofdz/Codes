const express=require('express')
const Patient=require('../models/PatientSc')
const fileDattente=require('../models/filleDattente')
const rendezVous=require('../models/rendezVous')
const fileDattenteRoute=new express.Router()
const passport=require('passport')
require('../controllers/passport')
,passport.authenticate('jwt',{session:false})
fileDattenteRoute.get('/patientsNotInFile',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        const file=await fileDattente.findOne()
        const patInFile=file.patient
        const patNotInFile=await Patient.find({ _id: { $nin:patInFile}})
        res.send(patNotInFile)
    }
    catch(e){
        res.send(e)
    }
    })
fileDattenteRoute.get('/fileDattente',passport.authenticate('jwt',{session:false}),async (req,res)=>{
try{
    const file=await fileDattente.findOne().populate('patient').exec()
    if(!file){
        file=await fileDattente.create({})
    }
    res.send(file)
}
catch(e){
    res.send(e)
}
})

fileDattenteRoute.patch('/updatefile',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        const data=req.body
        //await fileDattente.updateOne({_id:"6447b39e6bc98dc89fdbac9e"},{$set:{patient: data}})
        const fd=await fileDattente.findOne()
        fd.patient=data
        fd.save()
        res.status(200).send()
    }
    catch(e){
        res.send(e)
    }
    })
    fileDattenteRoute.patch('/chargerRdvs',passport.authenticate('jwt',{session:false}),async (req,res)=>{
        try{
            var date=new Date()
            date.setHours(0)
            date.setMinutes(60)
            date.setSeconds(0)
            date.setMilliseconds(0)
                   const rdvsAjrd=await rendezVous.find({date:date})
                   const patients=[]
                   rdvsAjrd.map(rdv=>{patients.push(rdv.patient)})
                   const fd=await fileDattente.findOne()
                   fd.patient=patients
                   fd.save()
                   res.status(200).send()
        }
        catch(e){
            res.send(e)
        }
        })   
         module.exports=fileDattenteRoute