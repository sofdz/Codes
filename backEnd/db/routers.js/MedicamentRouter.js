const express=require('express')
const Medicament=require('../models/MedicamentSc')
const MedicamentRouter = new express.Router()
//get all patients
MedicamentRouter.get('/medicaments', async (req, res) => {
    try{
    const p = await Medicament.find({})
    console.log(p)
    
    res.json(p.filter(x=>x.cache===false))
    }
    catch(e){
        res.status(401).send(e)
    }
})
//get one (1) patient
MedicamentRouter.get('/medicaments/:id', async (req, res) => {
    try{
        const med= await Medicament.findOne({ _id: req.params.id })
            res.json(p)
    }
    catch(e){
        res.status(401).send(e)
    }
})


//post to create 1 patient :
MedicamentRouter.post('/medicaments', async (req, res) => {
    try{
        const newmed=await Medicament.create(req.body)    
        res.status(201).send(newmed)
       }
       catch(e){
         res.status(500).send(e)
       }
})

//delete one patient with id:
MedicamentRouter.delete('/medicaments',async (req, res) => {
    try{
        const meds_supp=await Medicament.updateMany({_id:{$in:req.body}},{cache:true},{new:true})
        res.status(200).send(meds_supp)
      }
      catch(e){
      res.status(400).send(e)
      }
})
//Update 1 patient
MedicamentRouter.patch('/medicaments/:id', async (req, res) => {
    try {
        const med = await Medicament.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            res.status(201).send(med)
    } catch (e) {
        res.status(401).send(e)
    }
})
module.exports= MedicamentRouter