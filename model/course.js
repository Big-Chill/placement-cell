const mongoose = require('mongoose');
const { Schema } = mongoose;


const courseSchema = new Schema({
    name: { type: String, required: true, unique: true },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;