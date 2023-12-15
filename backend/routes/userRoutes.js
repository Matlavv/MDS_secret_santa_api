const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const groupController = require('../controllers/groupController');
const invitationController = require('../controllers/invitationController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/register')
    .post(userController.userRegister)

router
    .route('/login')
    .post(userController.userLogin)

router
    .route('/:user_id')
    .all(jwtMiddleware.verifyToken)
    .delete(userController.deleteUser)
    .put(userController.putUser)
    .patch(userController.patchUser)
    .get(userController.getUser)

router 
    .route('/:user_id/group/')
    .all(jwtMiddleware.verifyToken)
    .post(groupController.createGroup)

router 
    .route('/:user_id/group/:group_id')
    .all(jwtMiddleware.verifyToken)
    .get(groupController.getInfoGroup)
    .delete(groupController.deleteGroup)

router  
    .route('/:user_id/group/:group_id/invitation')
    .all(jwtMiddleware.verifyToken)
    .post(invitationController.addInvitation)

router
    .route('/:user_id/group/:group_id/invitation/accept')
    .all(jwtMiddleware.verifyToken)
    .post(invitationController.acceptInvite)

router
    .route('/:user_id/group/:group_id/invitation/decline')
    .all(jwtMiddleware.verifyToken)
    .post(invitationController.declineInvite)

module.exports = router;