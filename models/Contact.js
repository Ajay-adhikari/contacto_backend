const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String },
    linkedin: { type: String },
    twitter: { type: String }
});

module.exports = mongoose.model('Contact', contactSchema);
