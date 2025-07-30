const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  user: {
    type: String, 
    required: true
  }
}, {
  timestamps: true
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
