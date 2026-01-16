
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Seed Admin User (Endpoint to hit once to create admin)
// You can also just check on startup
router.post('/seed', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456789', salt);

        const existingUser = await User.findOne({ email: 'sainithin95054@gmail.com' });
        if (existingUser) {
            existingUser.password = hashedPassword;
            await existingUser.save();
            return res.status(200).json({ message: 'Admin password reset successfully' });
        }

        const newUser = new User({
            email: 'sainithin95054@gmail.com',
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { email: user.email, role: user.role } });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
