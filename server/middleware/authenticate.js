const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Load JWT secret key from environment variables
const jwtSecret = process.env.JWT_SECRET;

router.post('/contact', async (req, res) => {
    try {
        const { image, name, email, mobilenumber, message } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            image,
            name,
            email,
            mobilenumber,
            message
        });

        await newUser.save();
        
        //const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });
        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

        // Send response with token
        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
