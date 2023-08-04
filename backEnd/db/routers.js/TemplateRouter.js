const express=require('express')
const Template=require('../models/Templates')
const TemplateRouter =new express.Router()

//get all templates
TemplateRouter.get('/templates', async (req, res) => {
    try{
    const templates = await Template.find({})
    res.status(200).send(templates)
    }
    catch(e){
        res.send(e)
    }
})
//get one (1) template
TemplateRouter.get('/templates/:id', async (req, res) => {
        try{
            const template = await Template.findOne({ _id: req.params.id })
                res.status(201).send(template)
            }
        catch(e){res.status(401).send(e)}
        
})
//post to create 1 template :
TemplateRouter.post('/templates', async (req, res) => {
    try{
        const template=req.body
  const newTemplate= new Template(template)
  const result=await newTemplate.save({ validateBeforeSave: true })
  res.status(201).send(result)
        }
        catch(e){
     res.status(400).send(e)
    }
})

//delete one template with id:
TemplateRouter.delete('/templates/:id',async (req, res) => {
    try{
        const Template_supp=await Template.deleteOne({_id:req.params.id})
        res.status(200).send(Template_supp)
      }
      catch(e){
      res.status(400).send(e)
      }
})

//Update 1 template
TemplateRouter.patch('/templates/:id', async (req, res) => {
    try {
        console.log(req.body)
        const template = await Template.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        
            res.status(200).send(template)
        }
     catch (e) {
        res.status(401).send(e)
    }
})

module.exports=TemplateRouter