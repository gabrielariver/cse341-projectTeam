const Recipe = require('../models/recipe');

// Get all recipes (public)
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); 
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a recipe by ID (public)
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

// Create a new recipe (authenticated only)
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, prepTime, difficulty, category } = req.body;

    if (!title || !ingredients || !instructions || !prepTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      prepTime,
      difficulty,
      category,
      createdBy: req.user.username 
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update any recipe (only authenticated)
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request' });
  }
};

// Delete any recipe (only authenticated)
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};
