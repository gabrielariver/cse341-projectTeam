 const mongoose = require('mongoose');
const Favorite = require('../models/favorite');

// GET all favorites
exports.getFavorites = async (_req, res) => {
  try {
    const favorites = await Favorite.find().populate('recipeId');
    res.status(200).json(favorites);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET favorite by ID
exports.getFavoriteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const favorite = await Favorite.findById(id).populate('recipeId');
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });
    res.status(200).json(favorite);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create favorite
exports.createFavorite = async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    if (!recipeId || !userId) {
      return res.status(400).json({ message: 'recipeId and userId are required' });
    }
    const newFavorite = new Favorite({ recipeId, userId });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT update favorite
exports.updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const update = {};
    if (req.body.recipeId) update.recipeId = req.body.recipeId;
    if (req.body.userId) update.userId = req.body.userId;

    const updated = await Favorite.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Favorite not found' });
    res.status(200).json(updated);
  } catch {
    res.status(400).json({ message: 'Invalid update' });
  }
};

// DELETE favorite recipe 
exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const removed = await Favorite.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Favorite not found' });
    res.status(200).json({ message: 'Favorite removed' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
};
