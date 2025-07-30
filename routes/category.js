const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');
const categoryController = require('../controllers/category');

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', ensureAuth, categoryController.createCategory);
router.put('/:id', ensureAuth, categoryController.updateCategory);
router.delete('/:id', ensureAuth, categoryController.deleteCategory);

module.exports = router;
