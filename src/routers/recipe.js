const express = require('express')
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')
const sharp = require('sharp')
const router = new express.Router()
const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        console.log(req.body)
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please upload a JPG/JPEG/PNG image'))
        }
        
        cb(undefined, true)
        //cb(undefined, false)
    }
})

router.get('/add-recipe', async (req, res) => {
    const ingredients = await Ingredient.find()
    res.render('add-recipe', {
        ingredients,
        active_recipes: true,
        active_add_recipes: true
    });
})

router.post('/add-recipe', upload.single('picture'), async (req, res) => {
    try{
        const recipeData = req.body
        const buffer = await sharp(req.file.buffer).resize({width: 500, height: 400}).png().toBuffer()
        recipeData.ingredients = recipeData.ingredients.split(',')
        recipeData.picture = buffer
        const recipe = new Recipe(recipeData)
        await recipe.save()
        res.status(201).send({})
    }
    catch(error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/recipe/:id', async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id)
        
        if(!recipe){
            throw new Error()
        }

        await recipe.populate({
            path: 'ingredients'
        }).execPopulate()

        res.render('recipe', {
            recipe,
            active_recipes: true,
            active_view_id_recipes: true
        })
    }
    catch(e) {
        console.log(e)
        res.status(404).send()
    }
})

router.get('/recipe/:id/picture', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)

        if(!recipe || !recipe.picture){
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(recipe.picture)
    }
    catch(e) {
        console.log(e)
        res.status(404).send()
    }
})

module.exports = router