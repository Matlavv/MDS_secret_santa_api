const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const groupController = require('../controllers/groupController');
const invitationController = require('../controllers/invitationController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for Secret Santa
 */

/**
 * @swagger
 * components: 
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: String
 *         password:
 *           type: String
 *       required:
 *         - email
 *         - password
 *     Group:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         role:
 *          type: boolean
 *       required:
 *         - name
 *         - role
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             example:
 *               message: 'User created'
 */
router.post('/register', userController.userRegister);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User login 
 *         content:
 *           application/json:
 *             example:
 *               message: 'User logged in'
 */
router.post('/login', userController.userLogin);

/**
 * @swagger
 * /users/user_id:
 *   get:
 *     summary: Get user informations
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Get user informations
 *         content:
 *           application/json:
 *             example:
 *               message: 'User informations : id : 123, email : user@example.com, role : admin/user'
 */
router.get('/:user_id', jwtMiddleware.verifyToken, userController.getUser);

/**
 * @swagger
 * /users/user_id:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Delete a user
 *         content:
 *           application/json:
 *             example:
 *               message: 'User deleted'
 */
router.get('/:user_id', jwtMiddleware.verifyToken, userController.deleteUser);

/**
 * @swagger
 * /users/user_id:
 *   put:
 *     summary: Put a user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Modify a user 
 *         content:
 *           application/json:
 *             example:
 *               message: 'User modified'
 */
router.get('/:user_id', jwtMiddleware.verifyToken, userController.putUser);
/**
 * @swagger
 * /users/user_id:
 *   patch:
 *     summary: Patch a user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Modify a user
 *         content:
 *           application/json:
 *             example:
 *               message: 'User modified'
 */
router.get('/:user_id', jwtMiddleware.verifyToken, userController.getUser);

/**
 * @swagger
 * /users/user_id/group/:
 *   post:
 *     summary: Create a group
 *     tags:
 *       - Groups
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Create a Group
 *         content:
 *           application/json:
 *             example:
 *               message: 'Group created'
 */
router.post('/:user_id/group/', jwtMiddleware.verifyToken, groupController.createGroup);

/**
 * @swagger
 * /users/user_id/group/group_id:
 *   get:
 *     summary: Info of a group
 *     tags:
 *       - Groups
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Informations of a Group
 *         content:
 *           application/json:
 *             example:
 *               message: 'Group informations :'
 */
router.post('/:user_id/group/', jwtMiddleware.verifyToken, groupController.getInfoGroup);
/**
 * @swagger
 * /users/user_id/group/group_id:
 *   delete:
 *     summary: Delete a group
 *     tags:
 *       - Groups
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Delete a group
 *         content:
 *           application/json:
 *             example:
 *               message: 'Group deleted'
 */
router.post('/:user_id/group/', jwtMiddleware.verifyToken, groupController.deleteGroup);

/**
 * @swagger
 * /users/user_id/group/group_id/invitation:
 *   post:
 *     summary: Create invitation
 *     tags:
 *       - Invitation
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Create invitation
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invitation created'
 */
router.post('/:user_id/group/:group_id/invitation', jwtMiddleware.verifyToken, invitationController.addInvitation);

/**
 * @swagger
 * /users/user_id/group/group_id/invitation/accept:
 *   post:
 *     summary: Accept invitation
 *     tags:
 *       - Invitation
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Accept invitation 
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invitation accepted'
 */
router.post('/:user_id/group/:group_id/invitation', jwtMiddleware.verifyToken, invitationController.declineInvite);
/**
 * @swagger
 * /users/user_id/group/group_id/invitation/decline:
 *   post:
 *     summary: Refuse invitation
 *     tags:
 *       - Invitation
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Refuse invitation
 *         content:
 *           application/json:
 *             example:
 *               message: 'Invitation refused'
 */
router.post('/:user_id/group/:group_id/invitation', jwtMiddleware.verifyToken, invitationController.acceptInvite);

module.exports = router;
