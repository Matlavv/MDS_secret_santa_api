const User = require('../models/userModel');
const Group = require('../models/groupModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get the group
exports.getInfoGroup = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.group_id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Is the user admin ?
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.user_id !== userId || group.role !== 'admin') {
            return res.status(403).json({ message: "Acces declined. You don\'t have the permission to access here" });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Network error' });
    }
};

// Create a group method
exports.createGroup = async (req, res) => {
    try {
        await User.findById(req.params.user_id);

        // Check if the group already exist
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group name must be unique' });
        }

        const newGroup = new Group({...req.body, user_id: req.params.user_id});
        try {
            const group = await newGroup.save();
            group.role = 'admin';
            await group.save();
            res.status(201).json({ message: `Group created id : ${group.id}` });  
        } catch (error) {
            res.status(500).json({message: 'Network error'});
        }
    } catch (error) {
        res.status(500).json({message: 'User not found'});
    }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.group_id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Is the user admin ?
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.user_id !== userId || group.role !== 'admin') {
            return res.status(403).json({ message: "Access declined.  You don\'t have the permission to access here" });
        }

        // If user is admin delete the group
        await Group.findByIdAndDelete(req.params.group_id);
        res.status(200).json({ message: 'Group deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Network error' });
    }
};

// Put method on a group
exports.putGroup = async (req, res) => {
    try {
        // Check if the group already exist
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group name must be unique' });
        }
        
        const userId = req.params.user_id;
        const groupId = req.params.group_id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is admin 
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.user_id !== userId || group.role !== 'admin') {
            return res.status(403).json({ message: "Access declined.  You don\'t have the permission to access here" });
        }

        // If user is admin he has authorization

        await Group.findByIdAndUpdate(req.params.group_id, req.body, {new: true});
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({message: 'Network error'});
    }
};

// Patch a group method
exports.patchGroup = async (req, res) => {
    try {
        // Check if the group already exist
        const existingGroup = await Group.findOne({ name: req.body.name });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group name must be unique' });
        }

        const userId = req.params.user_id;
        const groupId = req.params.group_id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Is user admin ?
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.user_id !== userId || group.role !== 'admin') {
            return res.status(403).json({ message:  "Access declined.  You don\'t have the permission to access here" });
        }

        // If user is admin he can make modifications
        group = await Group.findByIdAndUpdate(req.params.group_id, req.body, {new: true});
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur'});
    }
};

