const mongoose = require('mongoose');
const { Schema } = mongoose;
const studentModel = require('./student');
const courseModel = require('./course');

const courseScoreSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: studentModel, required: true },
    course: { type: Schema.Types.ObjectId, ref: courseModel, required: true },
    score: { type: Number, required: true },
});

const CourseScore = mongoose.model('CourseScore', courseScoreSchema);

module.exports = CourseScore;