const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');
const ensureAuth = require('../middleware/ensureAuth');

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', ensureAuth, recipeController.createRecipe);
router.put('/:id', ensureAuth, recipeController.updateRecipe);
router.delete('/:id', ensureAuth, recipeController.deleteRecipe);


module.exports = router;
