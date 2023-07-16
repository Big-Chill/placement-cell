const mongoose = require('mongoose');
const { Schema } = mongoose;
const studentModel = require('./student');
const companyModel = require('./company');

const interviewSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: studentModel, required: true },
    company: { type: Schema.Types.ObjectId, ref: companyModel, required: true },
    date: { type: Date, required: true },
    result: { type: String, required: true, enum: ['Pass', 'Fail', 'On hold', 'Not Atempted'], default: 'Not Atempted' },
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
