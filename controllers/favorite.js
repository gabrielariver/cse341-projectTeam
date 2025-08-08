// controllers/favorite.js
const mongoose = require('mongoose');
const Favorite = require('../models/favorite');

// GET all favorites 
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find().populate('recipeId');
    return res.status(200).json(favorites);
  } catch (err) {
    console.error('getFavorites error:', err);
    return res.status(500).json({ message: 'Server error' });
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
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    return res.status(200).json(favorite);
  } catch (err) {
    console.error('getFavoriteById error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST Add a recipe to favorites
exports.createFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;

    if (!recipeId || !mongoose.isValidObjectId(recipeId)) {
      return res.status(400).json({ message: 'Valid recipeId is required' });
    }

    const userId = req.user?.username || req.user?.id || 'anonymous';

    const newFavorite = new Favorite({
      recipeId,
      userId
    });

    await newFavorite.save();
    const populated = await newFavorite.populate('recipeId');
    return res.status(201).json(populated);
  } catch (err) {
    console.error('createFavorite error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT Update a favorite
exports.updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { recipeId } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const update = {};
    if (recipeId) {
      if (!mongoose.isValidObjectId(recipeId)) {
        return res.status(400).json({ message: 'Invalid recipeId format' });
      }
      update.recipeId = recipeId;
    }

    const updated = await Favorite.findByIdAndUpdate(id, update, { new: true }).populate('recipeId');
    if (!updated) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error('updateFavorite error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE favorite
exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const removed = await Favorite.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    return res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    console.error('deleteFavorite error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
