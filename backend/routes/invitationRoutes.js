const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// Envoyer une invitation
router.post('/', jwtMiddleware.verifyToken, invitationController.sendInvitation);

// Obtenir les détails d'une invitation
router.get('/:invitationId', jwtMiddleware.verifyToken, invitationController.getInvitationDetails);

// Répondre à une invitation
router.put('/:invitationId', jwtMiddleware.verifyToken, invitationController.respondToInvitation);

// Supprimer une invitation
router.delete('/:invitationId', jwtMiddleware.verifyToken, invitationController.deleteInvitation);

module.exports = router;
