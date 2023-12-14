const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to register a new user
router.post('/register', userController.userRegister);

// Route to login a user
router.post('/login', userController.userLogin);

// Route to get a user's profile
router.get('/:userId', userController.getUser);

// Route to update a user's profile
router
    .route('/:userId')
    .all(jwtMiddleware.verifyToken)
    .get(userController.getUser)
    .put(userController.putUser)
    .patch(userController.patchUser)
    .delete(userController.deleteUser)

module.exports = router;
