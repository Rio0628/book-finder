const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema ({
    thumbnail: { type: String, required: false },
    title: { type: String, required: true },
    author: { type: [String], required: true },
    publishDate: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    comments: { type: String, required: true },
    savedGroup: { type: String, required: true },
}, { timestamps: true } );

module.exports = mongoose.model('books', Book);