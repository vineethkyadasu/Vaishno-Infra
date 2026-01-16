const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobId: { // Optional: in case we want to link stricty later
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String
    },
    resume: {
        type: String, // URL/Path to file
        required: true
    },
    status: {
        type: String,
        default: 'Applied', // Applied, Reviewed, Interview, Rejected, Hired
        enum: ['Applied', 'Reviewed', 'Interview', 'Rejected', 'Hired']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);
