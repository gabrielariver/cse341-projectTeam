const Recipe = require('../models/recipe');

// Get all recipes for authenticated user
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, userId: req.user.id });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, steps, prepTime, difficulty } = req.body;

    if (!title || !ingredients || !steps || !prepTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newRecipe = new Recipe({
      title,
      ingredients,
      steps,
      prepTime,
      difficulty,
      userId: req.user.id
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request' });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};
