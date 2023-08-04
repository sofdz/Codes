const express=require('express')
const Antecedent=require('../models/Antecedents')
const AntecRouter =new express.Router()

AntecRouter.get('/Antecedents',async (req,res)=>{
 try{
    const allAntecd= await Antecedent.find({})
    res.status(201).send(allAntecd)

 }catch(e){
    res.status(401).send(e)
 }})
 AntecRouter.post('/createAntecedent',async (req,res)=>{
    try{
       const antecdent= new Antecedent(req.body)
       await antecdent.save({ validateBeforeSave: true })
       res.status(201).send(antecdent)
    }catch(e){
       res.status(401).send(e)
    }
})
AntecRouter.delete('/deleteAntecedents',async (req,res)=>{
    try{
       const antecdents=await Antecedent.deleteMany({_id:{$in:req.body}})
       res.status(201).send(antecdents)
    }catch(e){
       res.status(401).send(e)
    }
})
AntecRouter.post('/AntecedentsPat',async (req,res)=>{
    try{
       const allAntecd= await Antecedent.find({_id:{$in:req.body}})
       res.status(201).send(allAntecd)
    }catch(e){
       res.status(401).send(e)
    }})
module.exports=AntecRouter