const express=require('express')
const Acte=require('../models/ActeSc')
const ActeRouter =new express.Router()

//get all actes
ActeRouter.get('/actes', async (req, res) => {
    try{
    const actes = await Acte.find({cache:false})
    res.status(200).send(actes)
    }
    catch(e){
        res.send(e)
    }
})
ActeRouter.get('/actesss', async (req, res) => {
    try{
    const actes = await Acte.find()
    res.status(200).send(actes)
    }
    catch(e){
        res.send(e)
    }
})
//get one (1) acte
ActeRouter.get('/actes/:id', async (req, res) => {
        try{
            const acte = await Acte.findOne({ _id: req.params.id })
                res.status(201).send(acte)
            }
        catch(e){res.status(401).send(e)}
        
})
//post to create 1 acte :
ActeRouter.post('/actes', async (req, res) => {
    try{
        const acte=req.body
  const newActe= new Acte(acte)
  const result=await newActe.save({ validateBeforeSave: true })
  res.status(201).send(result)
        }
        catch(e){
     res.status(400).send(e)
    }
})

//delete one acte with id:
ActeRouter.delete('/actes',async (req, res) => {
    try{
        const Actes_supp=await Acte.updateMany({_id:{$in:req.body}},{cache:true})
        res.status(200).send()
      }
      catch(e){
      res.status(400).send(e)
      }
})

//Update 1 acte
ActeRouter.patch('/actes/:id', async (req, res) => {
    try {
        const acte = await Acte.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        
            res.status(200).send(acte)
        }
     catch (e) {
        res.status(401).send(e)
    }
})

module.exports=ActeRouter