const express = require('express');
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/user.controllers');
const authenticator = require('../middlewares/authenticator');
const validator = require('../middlewares/validator');

const router = express.Router();

// Register and Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Authenticated routes
router.get('/', authenticator, getAllUsers);
router.get('/:id', authenticator, getUserById);

// Admin-only routes
router.patch('/:id', authenticator, validator, updateUser);
router.delete('/:id', authenticator, validator, deleteUser);

module.exports = router;
