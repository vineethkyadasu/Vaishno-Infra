const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../models/Application');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, 'resume-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Resumes only (PDF, DOC, DOCX)!');
        }
    }
});

// Submit Application
router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { jobTitle, jobId, name, email, phone, coverLetter } = req.body;

        let resumeUrl = '';
        if (req.file) {
            resumeUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        } else {
            return res.status(400).json({ message: 'Resume is required' });
        }

        const newApplication = new Application({
            jobTitle,
            jobId,
            name,
            email,
            phone,
            coverLetter,
            resume: resumeUrl
        });

        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (err) {
        console.error("Application Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Get All Applications (For Admin)
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Application Status (For Admin)
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedApp = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedApp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Application (For Admin)
router.delete('/:id', async (req, res) => {
    try {
        const deletedApp = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApp) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
