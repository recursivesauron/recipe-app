const mongoose = require('mongoose')
const validator = require('validator')

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    serves: {
        type: Number,
        required: true,
        validate(value){
            if(value < 1){
                throw new Error('Recipe must make at least one serving')
            }
        }
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ingredient'
    }],
    instructions: {
        type: String,
        trim: true,
        required: true
    },
    picture: {
        type: Buffer
    }
})

recipeSchema.virtual('_ingredients', {
    ref: 'Ingredient',
    localField: '_id',
    foreignField: 'ingredient'
})

recipeSchema.methods.toJSON = function() {
    const recipe = this
    const recipeObject = recipe.toObject()
    delete recipeObject.picture
    return recipeObject
}

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe