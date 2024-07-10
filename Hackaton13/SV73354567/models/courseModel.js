// models/courseModel.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    coverImage: { type: String },
    price: { type: Number, required: true }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;