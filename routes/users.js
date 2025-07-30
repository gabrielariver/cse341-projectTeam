const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { ensureAuth } = require('../middleware/ensureAuth');


router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
router.post('/', ensureAuth, userController.createUser);
router.put('/:username', ensureAuth, userController.updateUser);
router.delete('/:username', ensureAuth, userController.deleteUser);

module.exports = router;
