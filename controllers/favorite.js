// controllers/favorite.js
const mongoose = require('mongoose');
const Favorite = require('../models/favorite');

// GET all favorites 
exports.getFavorites = async (req, res) => {
  try {
    const filter = req.user?.username ? { userId: req.user.username } : {};
    const favorites = await Favorite.find(filter).populate('recipeId');
    return res.status(200).json(favorites);
  } catch (err) {
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

    const filter = { _id: id };
    if (req.user?.username) filter.userId = req.user.username;

    const favorite = await Favorite.findOne(filter).populate('recipeId');
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });

    return res.status(200).json(favorite);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST: Add a recipe to favorites
exports.createFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId || !mongoose.isValidObjectId(recipeId)) {
      return res.status(400).json({ message: 'Valid recipeId is required' });
    }
    if (!req.user?.username) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newFavorite = new Favorite({
      recipeId,
      userId: req.user.username
    });

    await newFavorite.save();
    return res.status(201).json(newFavorite);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT: Update a favorite
exports.updateFavorite = async (req, res) => {
  try {
    if (!req.user?.username) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updated = await Favorite.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.username },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Favorite not found' });

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid update' });
  }
};

// DELETE favorite
exports.deleteFavorite = async (req, res) => {
  try {
    if (!req.user?.username) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const removed = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.username
    });

    if (!removed) return res.status(404).json({ message: 'Favorite not found' });

    return res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
};
