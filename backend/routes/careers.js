
const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// Create Career
router.post('/', async (req, res) => {
    try {
        const newCareer = new Career(req.body);
        const savedCareer = await newCareer.save();
        res.status(201).json(savedCareer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Careers
router.get('/', async (req, res) => {
    try {
        const careers = await Career.find().sort({ createdAt: -1 });
        res.json(careers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Career
router.put('/:id', async (req, res) => {
    try {
        const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCareer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Career
router.delete('/:id', async (req, res) => {
    try {
        await Career.findByIdAndDelete(req.params.id);
        res.json({ message: 'Career deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
