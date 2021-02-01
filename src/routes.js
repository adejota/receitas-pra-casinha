const express = require('express')
const routes = express.Router()
const recipes = require("./app/controllers/recipes")
const upload = require('./storage')

routes.get("/", recipes.index)
routes.get("/recipes", recipes.recipes)
routes.get("/about", recipes.about)
routes.get("/share-recipe", recipes.shareRecipe)
routes.get('/recipes/:id', recipes.recipe )
routes.post('/recipes', upload.single('photo'), recipes.post )
routes.put('/recipes', upload.single('photo'), recipes.put)
routes.get('/recipes/:id/edit', recipes.edit )
routes.delete("/recipes", recipes.delete)

module.exports = routes
