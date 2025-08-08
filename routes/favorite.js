const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');
const favoriteController = require('../controllers/favorite');

router.get('/', favoriteController.getFavorites);
router.get('/:id', favoriteController.getFavoriteById);
router.post('/', ensureAuth, favoriteController.createFavorite);
router.put('/:id', ensureAuth, favoriteController.updateFavorite);
router.delete('/:id', ensureAuth, favoriteController.deleteFavorite);

module.exports = router;
