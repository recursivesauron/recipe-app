const mongoose = require('mongoose')
const validator = require('validator')

const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    shelfLife: {
        type: Number,
        required: true,
        validate(value){
            if(value < 1){
                throw new Error('Shelf life should be a positive integer')
            }
        }
    },
    storageDetails: {
        type: String,
        trim: true
    }
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)
module.exports = Ingredient