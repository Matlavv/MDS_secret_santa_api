const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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
    .route('/:user_id/groups/')
    .all(jwtMiddleware.verifyToken)
    .post(userController.createGroup)

router 
    .route('/:user_id/groups/:group_id')
    .all(jwtMiddleware.verifyToken)
    .get(userController.getInfoGroup)
    .delete(userController.deleteGroup)
    .patch(userController.patchGroup)
    .put(userController.putGroup)

router  
    .all(jwtMiddleware.verifyToken)
    .route('/:user_id/groups/:group_id/invitation')
    .post(userController.addInvitation)

router
    .all(jwtMiddleware.verifyToken)
    .all(jwtMiddleware.verifyToken)
    .route('/:user_id/groups/:group_id/invitation/accept')
    .post(userController.acceptInvit)

router
    .all(jwtMiddleware.verifyToken)
    .all(jwtMiddleware.verifyToken)
    .route('/:user_id/groups/:group_id/invitation/decline')
    .post(userController.declineInvit)

module.exports = router;