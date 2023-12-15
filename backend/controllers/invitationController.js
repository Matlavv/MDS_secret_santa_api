const Invitation = require('../models/invitationModel');
const Group = require('../models/groupModel');
const User = require('../models/userModel');

// Send an invitation
exports.addInvitation = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.group_id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is admin
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }

        if (group.user_id !== userId || group.role !== 'admin') {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'avez pas les permissions nécessaires.' });
        }

        // If user is admin he can send invite
        const token = await jwt.sign({ groupId, userId }, process.env.JWT_KEY_INVITATION, { expiresIn: '48h' });

        res.status(200).json({ message: 'Invitation send', token });
    } catch (error) {
        res.status(500).json({message: 'Network error'});
    }
};

// Accept an invitation method
exports.acceptInvite = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.group_id;

        const user = await User.findById(userId);
        const group = await Group.findById(groupId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (group.user_id == userId || group.role == 'admin') {
            return res.status(403).json({ message: 'Access denied, cannot join your own group' });
        }

        // Adding user into the group 
        group.role = 'admin';

        await group.save();

        res.status(200).json({ message: 'Invitation accepted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Network error' });
    }
};

// Decline an invitation
exports.declineInvite = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.group_id;

        const user = await User.findById(userId);
        const group = await Group.findById(groupId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (group.user_id == userId || group.role == 'admin') {
            return res.status(403).json({ message: 'Access denied. Cannot decline an invitation from your own group' });
        }

        res.status(200).json({ message: 'Invitation declined' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Network error' });
    }
};