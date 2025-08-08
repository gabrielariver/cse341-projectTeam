const Favorite = require('../models/favorite');

// GET all favorites
exports.getFavorites = async (req, res) => {
  try {
    const filter = req.user?.username ? { user: req.user.username } : {};
    const favorites = await Favorite.find(filter).populate('recipe');
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
    if (req.user?.username) filter.user = req.user.username;

    const favorite = await Favorite.findOne(filter).populate('recipe');
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });

    return res.status(200).json(favorite);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};


// POST: Add a recipe to favorites
exports.createFavorite = async (req, res) => {
  try {
    const { recipe } = req.body;

    if (!recipe) {
      return res.status(400).json({ message: 'Recipe ID is required' });
    }

    const newFavorite = new Favorite({
      recipe,
      user: req.user.username
    });

    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT: Update a favorite
exports.updateFavorite = async (req, res) => {
  try {
    const updated = await Favorite.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.username
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Invalid update' });
  }
};

// DELETE favorite 
exports.deleteFavorite = async (req, res) => {
  try {
    const removed = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user.username
    });

    if (!removed) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};
