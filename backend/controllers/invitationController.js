const Invitation = require('../models/invitationModel');
const Group = require('../models/groupModel');
const User = require('../models/userModel');

// Send an invitation
exports.sendInvitation = async (req, res) => {
    try {
        const { groupId, recipientId } = req.body;
        const group = await Group.findById(groupId);
        const recipient = await User.findById(recipientId);

        // Check if the group and recipient exist
        if (!group || !recipient) {
            return res.status(404).json({ message: "Group or Recipient not found" });
        }

        // Check if the sender is the admin of the group
        if (group.admin.toString() !== req.user.id) {
            return res.status(403).json({ message: "Only group admin can send invitations" });
        }

        // Create the invitation
        const newInvitation = new Invitation({
            group: groupId,
            sender: req.user.id,
            recipient: recipientId,
            expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000) // Set expiration to 48 hours from now
        });

        const invitation = await newInvitation.save();
        res.status(201).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending invitation" });
    }
};

// Get an invitation details
exports.getInvitationDetails = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.invitationId);
        if (!invitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }
        res.status(200).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving invitation details" });
    }
};

// Respond to an invitation (accept or reject)
exports.respondToInvitation = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.invitationId);
        if (!invitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }

        // Check if the invitation is expired
        if (new Date() > new Date(invitation.expiresAt)) {
            return res.status(400).json({ message: "Invitation has expired" });
        }

        // Update the invitation status (accepted or rejected)
        invitation.status = req.body.status;
        await invitation.save();

        // Additional logic for accepting the invitation, such as adding the user to the group, can be added here

        res.status(200).json({ message: `Invitation ${req.body.status}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error responding to invitation" });
    }
};

// Delete an invitation
exports.deleteInvitation = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.invitationId);
        if (!invitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }

        // Check if the sender or recipient is trying to delete the invitation
        if (invitation.sender.toString() !== req.user.id && invitation.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this invitation" });
        }

        await Invitation.findByIdAndDelete(req.params.invitationId);
        res.status(200).json({ message: "Invitation deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting invitation" });
    }
};

module.exports = exports;
