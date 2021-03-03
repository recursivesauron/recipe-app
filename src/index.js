const path = require('path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const Recipe = require('./models/recipe')
require('./db/mongoose')
const recipeRouter = require('./routers/recipe')
const ingredientRouter = require('./routers/ingredient')

const app = express()

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.use(express.json())
app.use(recipeRouter)
app.use(ingredientRouter)

//set up custom hbs helper functions
hbs.handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});


app.get('', async (req, res) => {
    //const recipes = await Recipe.find()
    const recipes = await Recipe.find()
    
    recipes.forEach(async (recipe) => {
        await recipe.populate({
            path: 'ingredients'
       }).execPopulate()

       let stringIngredients = "";
       recipe.ingredients.forEach((ingredient) => {
           stringIngredients += ingredient.name + ", "
       })

       recipe.stringIngredients = stringIngredients.slice(0, -2)
    })
    
    res.render('index', {
        recipes: recipes,
        active_home: true
    });
});

app.listen(port, () => {
    console.log("server is up on port: " + port)
})