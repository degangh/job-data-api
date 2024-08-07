const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    requirements: 
    { 
        type: [String], 
        required: true 
    },
    url: {
        type: String,
        required: true
    },
    relevance_to_search: {
        type: Number,
        required: true
    },
    post_data: {
        type: Date,
        required: true
    },
    channel: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Job', jobSchema);