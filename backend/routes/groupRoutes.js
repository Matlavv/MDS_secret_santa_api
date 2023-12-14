const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Créer un groupe
router.post('/', jwtMiddleware.verifyToken, groupController.createGroup);

// Obtenir les détails d'un groupe
router.get('/:groupId', jwtMiddleware.verifyToken, groupController.getGroupDetails);

// Mettre à jour un groupe
router.put('/:groupId', jwtMiddleware.verifyToken, groupController.updateGroup);

// Supprimer un groupe
router.delete('/:groupId', jwtMiddleware.verifyToken, groupController.deleteGroup);

// Ajouter un membre à un groupe
router.post('/:groupId/members', jwtMiddleware.verifyToken, groupController.addMember);

// Retirer un membre d'un groupe
router.delete('/:groupId/members/:userId', jwtMiddleware.verifyToken, groupController.removeMember);

module.exports = router;
