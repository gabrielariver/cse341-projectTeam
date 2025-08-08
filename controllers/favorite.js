const mongoose = require('mongoose');
const Favorite = require('../models/favorite');

// GET all favorites 
exports.getFavorites = async (req, res) => {
  try {
    const filter = req.user?.username ? { userId: req.user.username } : {};
    const favorites = await Favorite.find(filter).populate('recipeId');
    return res.status(200).json(favorites);
  } catch {
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
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST
exports.createFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) return res.status(400).json({ message: 'recipeId is required' });

    const newFavorite = new Favorite({
      recipeId,
      userId: req.user.username
    });

    await newFavorite.save();
    return res.status(201).json(newFavorite);
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT
exports.updateFavorite = async (req, res) => {
  try {
    const updated = await Favorite.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.username },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Favorite not found' });
    return res.status(200).json(updated);
  } catch {
    return res.status(400).json({ message: 'Invalid update' });
  }
};

// DELETE
exports.deleteFavorite = async (req, res) => {
  try {
    const removed = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.username
    });
    if (!removed) return res.status(404).json({ message: 'Favorite not found' });
    return res.status(200).json({ message: 'Favorite removed' });
  } catch {
    return res.status(400).json({ message: 'Invalid ID' });
  }
};
