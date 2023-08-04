const express=require('express')
const consultation=require('../models/consultation')
const ConsultRouter =new express.Router()
ConsultRouter.post('/createConsult',async(req,res)=>{
 try{
   const newConsult=new consultation(req.body)
   await newConsult.save()
   const Consultation=await consultation.findById(newConsult._id).populate('medecin').populate('reg').exec()
   res.status(201).send(Consultation)
 }
catch(e){
    console.log(e)
    res.status(401).send(e)
}
})
ConsultRouter.get('/getConsultations/:id',async(req,res)=>{
    try{
       const consultations=await consultation.find({patient:req.params.id}).populate('medecin').populate('reg').exec()
       res.status(201).send(consultations)
    }
    catch(e){
        res.status(401).send(e)
    }
})
ConsultRouter.patch('/modifConsultation/:id',async(req,res)=>{
    try{
       const consult=await consultation.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
       
       /*if(!req.body.dilatation){
         consult.dilatation=undefined
       }
       await consult.save*/
       if(!req.body.dilatation){
        const consult=await consultation.findOneAndUpdate({_id:req.params.id},{$unset:{dilatation:1}},{new:true})
       }
       res.status(201).send(consult)
    }
    catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})
ConsultRouter.post('/consultStat',async(req,res)=>{
    try{
        var date=req.body.date
        date=new Date(`${date}-01T00:00:00.000Z`)
            var month=date.getMonth()
            var labelsJours=[]
            var dataJours=[]
            while(date.getMonth()==month){
            var consultations=await consultation.find({date_consult:date})
             labelsJours.push(String(date.getDate()))
             dataJours.push(consultations.length)
             date.setDate(date.getDate()+1)
            }
            var labelsMois=[]
            date.setDate(1)
            date.setMonth(0)
            month=date.getMonth()
            const year=date.getFullYear()
            var nbConsultmois=0
            var datamois=[]
            while(date.getFullYear()==year){
                if(date.getMonth()==month){
                    consultations=await consultation.find({date_consult:date})
                    nbConsultmois=nbConsultmois+consultations.length
                    date.setDate(date.getDate()+1)               
                }
                else{
                    labelsMois.push(String(date.getMonth()))
                    datamois.push(nbConsultmois)
                    nbConsultmois=0
                    month=date.getMonth()
                }
            }
            labelsMois.push('12')
            datamois.push(nbConsultmois)
         res.status(201).send([labelsJours,dataJours,labelsMois,datamois])
    }
    catch(e){
        res.status(401).send(e)
    }
})

module.exports=ConsultRouter