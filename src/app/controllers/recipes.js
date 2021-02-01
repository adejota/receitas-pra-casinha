const fs = require('fs')
const Recipe = require('../models/Recipe')
const multer = require('multer')

module.exports = {
    index(req, res) {

        Recipe.all(function(recipes) {
            var lastThree = recipes.slice(-3)
            return res.render("index", { recipes: lastThree } )
        })

    },
    about(req, res) {
        return res.render("about")
    },
    shareRecipe(req, res) {
        return res.render("share-recipe")
    },
    recipe(req, res) {

        Recipe.find(req.params.id, function(recipe) {
            if (!recipe) return res.send("Hmm, não achei essa receita!")

            recipe.ingredients = recipe.ingredients.split(";")
            recipe.preparation = recipe.preparation.split(";")

            return res.render("recipe", { recipe } )
        })
    
    },
    post(req, res) {
        
        // Verifica se todos os campos estão preenchidos
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Por favor, preencha todos os campos`)
            }
        }       
    
        Recipe.create( { data: req.body, file: req.file }, function(recipeId) {
            return res.redirect(`/recipes/${recipeId}`)
        })

        return
        
    },
    recipes(req, res) {

        let { filter } = req.query

        if (!filter) {
            Recipe.all(function(recipes) {
                return res.render("recipes", { recipes } )
            })
        } else {
            Recipe.findBy(filter, function(recipes) {
                return res.render("recipes", {recipes, filter})
            })
        }
    
    },
    edit(req, res){
        
        Recipe.find(req.params.id, function(recipe) {
            if (!recipe) return res.send("Hmm, não achei essa receita!")

            return res.render("edit", { recipe })
        })

    },
    put(req, res){
    
        Recipe.update({ data: req.body, file: req.file }, function() {
            return res.redirect(`/recipes/${req.body.id}`)
        })
    },
    delete(req, res) {

        Recipe.delete(req.body.id, function() {
            return res.redirect(`/recipes`)
        })
    }
}







