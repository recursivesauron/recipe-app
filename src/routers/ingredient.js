const express = require('express')
const Ingredient = require('../models/ingredient')
const router = new express.Router()

router.get('/add-ingredient', async (req, res) => {
    res.render('add-ingredient', {
        active_add_ingredients: true,
        active_ingredients: true
    });
})

router.post('/add-ingredient', async (req, res) => {
    try{
        const ingredient = new Ingredient(req.body)
        await ingredient.save()
        res.status(201).send(ingredient)
    }
    catch(error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router