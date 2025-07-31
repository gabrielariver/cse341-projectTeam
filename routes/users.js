const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const ensureAuth = require('../middleware/ensureAuth');



router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById );
router.post('/', ensureAuth, userController.createUser);
router.put('/:id', ensureAuth, userController.updateUser);
router.delete('/:id', ensureAuth, userController.deleteUser);

module.exports = router;
