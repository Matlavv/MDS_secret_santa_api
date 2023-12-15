const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

// Register method
exports.userRegister = async (req, res) => {
    try {
        let newUser = new User(req.body);
        let user = await newUser.save();
        res.status(201).json({ message: `User created : ${user.email}, id : ${user.id}` });        
    } 
    catch (error) {
        console.log(error);
        res.status(401).json({message: 'invalid request'});
    }
};

// Login method
exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            res.status(500).json({message: 'User not found'});
            return;
        }

        // comparing hash here because hash 
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(user.email == req.body.email && validPassword && user.role == req.body.role) {
            let userData = {
                id: user._id,
                email: user.email,
                role: user.role,
            };

            const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "10h"});
            res.status(200).json({token});
            }
        else {
            res.status(401).json({message: "Wrong login identifiants"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occured during the traitement"})
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.user_id);
        res.status(200).json({message: 'User deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Network error'});
    }
};

// Put method
exports.putUser = async (req, res) => {
    try {
        // Check if the email is already use
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: 'An error occured while trying to change the user' });
        }

        const user = await User.findByIdAndUpdate(req.params.user_id, req.body, {new: true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Network error'});
    }
};

// Patch method
exports.patchUser = async (req, res) => {
    try {
        // Check if the email is already use
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: 'An error occured while trying to change the user' });
        }

        const user = await User.findByIdAndUpdate(req.params.user_id, req.body, {new: true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Network error'});
    }
};

// Get method
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        res.status(200).json({ message: `User found id : ${user.id}, email : ${user.email}, role : ${user.role}` });  
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Network error'});
    }
};

