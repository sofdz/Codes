const express=require('express')
const Reglement=require('../models/ReglementsSc')
const RegRouter =new express.Router()

RegRouter.get('/Reglements',async (req,res)=>{
    try{
   const reglements=await Reglement.find().populate({path:'consult',populate:{path:'patient',model:'Patient'},select:'patient date_consult num_consult'}).exec()
      res.status(201).send(reglements)
    }
    catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})
RegRouter.patch('/Payer/:id',async (req,res)=>{
    try{

        const reglement=await Reglement.findByIdAndUpdate(req.params.id,{etat:"Payé",Date_paiement:req.body.dateDuJour})
      res.status(201).send(reglement)
    }
    catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})
RegRouter.get('/recette',async (req,res)=>{
    try{
        var dateDuJour=new Date()
        dateDuJour.setHours(0)
        dateDuJour.setMinutes(60)
        dateDuJour.setSeconds(0)
        dateDuJour.setMilliseconds(0)
   const reglements=await Reglement.find({Date_paiement:dateDuJour})
   dateDuJour.setDate(dateDuJour.getDate()-1)
   const reglementsHier=await Reglement.find({Date_paiement:dateDuJour})
   var recette=0
   var recetteHier=0
    reglements.map(reg=>{recette=recette+reg.montant})
    reglementsHier.map(reg=>{recetteHier=recetteHier+reg.montant})
    var evolution=0
     if(recetteHier==0){evolution=-1}
     else{evolution=recette/recetteHier*100-100}
      res.status(201).send({recetteDeJour:recette,evolution:evolution})
    }
    catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})
RegRouter.post('/statsRecette',async (req,res)=>{
    try{
        var date=req.body.date
        if(date){
            date=new Date(`${date}-01T00:00:00.000Z`)
            const data={labels:[],datasets:[{label:"recette du mois",data:[],backgroundColor:'rgba(255,99,132, 0.2)', borderColor:'rgb(255,99,132)'},{label:`recette mensuelle pour l'année${date.getFullYear()}`,data:[],backgroundColor:'rgba(132, 99,255, 0.2)',borderColor:'rgb(132,99,255)'}]}
            var month=date.getMonth()
            var labels=[]
            while(date.getMonth()==month){
            var reglements=await Reglement.find({Date_paiement:date})
            var recette=0
             reglements.map(reg=>{recette=recette+reg.montant})
             labels.push(String(date.getDate()))
             data.datasets[0].data.push(recette)
             date.setDate(date.getDate()+1)
            }
            data.labels.push(labels)
            labels=[]
            date.setDate(1)
            date.setMonth(0)
            month=date.getMonth()
            const year=date.getFullYear()
            recette=0
            while(date.getFullYear()==year){
                if(date.getMonth()==month){
                    reglements=await Reglement.find({Date_paiement:date})
                    reglements.map(reg=>{recette=recette+reg.montant})
                    date.setDate(date.getDate()+1)               
                }
                else{
                    labels.push(String(date.getMonth()))
                    data.datasets[1].data.push(recette)
                    recette=0
                    month=date.getMonth()
                }
            }
            labels.push('12')
            data.datasets[1].data.push(recette)
            data.labels.push(labels)
         res.status(201).send(data)
        }
    }
    catch(e){
        console.log(e)
        res.status(401).send(e)
    }
})
module.exports=RegRouter