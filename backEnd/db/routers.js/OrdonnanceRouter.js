//const mongoose = require('../mongoose')
const Ordonnance = require('../models/OrdonnanceSc')
const express = require('express')
const OrdonnanceRouter = new express.Router()
//get all ordonnances
OrdonnanceRouter.get('/ordonnances/:id', async (req, res) => {
    try {
        const ords = await Ordonnance.find({ consultation: req.params.id }).populate({ path: 'medicaments', populate: { path: 'medicament', model: 'Medicament' } }).exec()
        res.json(ords)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//get one (1) ordonnance
OrdonnanceRouter.get('/ordonnance/:id', async (req, res) => {

    try {
        const ord = await Ordonnance.findById(req.params.id)
        res.json(p)
    }
    catch (e) { res.status(400).send(e) }


})
//post to create 1 ordonnance :
OrdonnanceRouter.post('/createdOrd', async (req, res) => {
    try {
        const newOrd = new Ordonnance(req.body)
        result = await newOrd.save()
        res.status(201).send(result)
    }
    catch (e) {
        res.status(500).send(e)
    }
})
//delete one ordonnance with id:
OrdonnanceRouter.delete('/ordonnance/:id', async (req, res) => {
    try {
        const ordonnance = await Ordonnance.deleteOne({'_id':req.params.id})
        res.status(201).send(ordonnance)
    } catch (e) {
        res.status(401).send(e)
    }
})

//Update 1 ordonnance
OrdonnanceRouter.patch('/ordonnance/:id', async (req, res) => {
    try {
        const temp = await Ordonnance.findById(req.params.id)
        console.log(req.body)
        if (req.body.typeOrd === 'Prescription') {
            temp.medicaments = req.body.medicaments
        } else if(temp&&['Orientation', 'Certificat', 'Réponse', 'Compte rendu'].includes(temp.typeOrd)) {
            temp.contenu = req.body.contenu
        }

        await temp.save()
        res.status(201).send(temp)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = OrdonnanceRouter