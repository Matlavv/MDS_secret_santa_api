const Group = require('../models/groupModel');
const User = require('../models/userModel');

// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const newGroup = new Group({
            ...req.body,
            admin: req.user.id  // Assuming the logged-in user is the admin
        });
        const group = await newGroup.save();
        res.status(201).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating group" });
    }
};

// Get details of a specific group
exports.getGroupDetails = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId).populate('members');
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving group details" });
    }
};

// Update a group's information
exports.updateGroup = async (req, res) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.groupId, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating group" });
    }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.groupId);
        res.status(200).json({ message: "Group deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting group" });
    }
};

// Add a member to a group
exports.addMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        const user = await User.findById(req.body.userId);

        if (!group || !user) {
            return res.status(404).json({ message: "Group or User not found" });
        }

        if (group.members.includes(req.body.userId)) {
            return res.status(400).json({ message: "User already in group" });
        }

        group.members.push(req.body.userId);
        await group.save();
        res.status(200).json({ message: "User added to group" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding member to group" });
    }
};

// Remove a member from a group
exports.removeMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        const userId = req.body.userId;

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        group.members = group.members.filter(member => member.toString() !== userId);
        await group.save();
        res.status(200).json({ message: "User removed from group" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing member from group" });
    }
};

module.exports = exports;
