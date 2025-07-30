const { types, required } = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        types: String,
        required: true
    },
    description: String
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);