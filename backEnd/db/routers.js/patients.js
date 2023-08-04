const express=require('express')
const Patient=require('../models/PatientSc')
const rendezVous=require('../models/rendezVous')
const fileDattente=require('../models/filleDattente')
const fs = require('fs')
const formidable = require('formidable')

const Sequence=require('../models/sequence')
const PatientRouter=new express.Router()
PatientRouter.get('/Patients',async (req,res)=>{
   try{
    const Patients=await Patient.find({})
    res.status(200).send(Patients)
   }
catch(e){
res.status(400).send(e)
}
})
PatientRouter.post('/createPatient',async (req,res)=>{
   try{
    const patient=new Patient(req.body)
    await patient.save({ validateBeforeSave: true })
    res.status(200).send(patient)
   }
catch(e){
   console.log(e)
res.status(400).send(e)
}
})
PatientRouter.delete('/deletePatients',async (req,res)=>{
   try{
      const deletedPatients=req.body
        const pat=await Patient.deleteMany({_id:{$in:deletedPatients}})
    res.status(200).send({message:`vous avez supprimé${pat.deletedCount} patient(s)`})
   }
catch(e){
res.status(400).send(e)
}
})
PatientRouter.patch('/Patients/:id',async (req,res)=>{
   try{
    const patient=await Patient.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).send(patient)
   }
catch(e){
res.status(400).send(e)
}
})
PatientRouter.get('/getPatient/:id',async (req,res)=>{
   try{
    const patient=await Patient.findById(req.params.id)
    res.status(200).send(patient)
   }
catch(e){
res.status(400).send(e)
}
})
PatientRouter.patch('/ajoutAntecedents/:id',async (req,res)=>{
   try{
      const patient=await Patient.findByIdAndUpdate(req.params.id,{antecedents:req.body},{new:true})
      res.status(201).send(patient)
   }
   catch(e){
      res.status(400).send(e)
   }
})
PatientRouter.get('/statPat',async (req,res)=>{
   try{
      const patients=await Patient.find({})
      const date=new Date()
      const patientAvecRDV=await rendezVous.find({date:date.toLocaleDateString('en-GB', { timeZone: 'UTC' })})
      const patientDansLafile=await fileDattente.findOne({})
      res.status(201).send({nbPatiens:patients.length,nbpatrdvs:patientAvecRDV.length,nbpatfile:patientDansLafile.patient.length})
   }
   catch(e){
      res.status(400).send(e)
   }
})
PatientRouter.get('/statPatAge',async (req,res)=>{
   try{
      const pat=await Patient.findOne({age:{$lte:1}})
      console.log(pat)
      const bebes=await Patient.find({age:{$lte:1}})
      const enfant=await Patient.find({age:{$gte:2,$lte:17}})
      const adulte=await Patient.find({age:{$gte:18,$lte:54}})
      const agé=await Patient.find({age:{$gte:55}})
      res.status(201).send([bebes.length,enfant.length,adulte.length,agé.length])
   }
   catch(e){
      console.log(e)
      res.status(400).send(e)
   }
})
PatientRouter.post('/ajouterFichier/:id/:n', async (req, res) => {
   try {
      var form = new formidable.IncomingForm()
      var files = []
      var pieces = []
      console.log(req.params.n)
      form.multiples = true
      form.parse(req)
      await Patient.findByIdAndUpdate(req.params.id, { pieces: [] }, { new: true })
      let cpt =0
      form.on('file', async function (field, file) {
         let temp = {
            nomFichier: file.originalFilename,
            fichier: Buffer(fs.readFileSync(file.filepath)).toString('base64')
         }
         pieces.push(temp)
         cpt++
         if(cpt.toString()===req.params.n){ 
            p = await Patient.findByIdAndUpdate(req.params.id, { pieces: pieces }, { new: true })
            res.status(201).send(p)
         }

      })
   }
   catch (e) {
      console.log(e)
   }
})

PatientRouter.delete('/supprimerFichier/:id/:nomFichier', async(req,res)=>{
   try{
      const p = await Patient.findById(req.params.id)
      const pieces = p.pieces
      const newPieces = pieces.filter((piece)=>piece.nomFichier !== req.params.nomFichier)
      console.log(pieces.length,newPieces.length)
      await p.updateOne({pieces:newPieces})
      res.status(200).send(p)
   }
   catch(e){

   }
})

module.exports=PatientRouter
