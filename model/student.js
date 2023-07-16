const mongoose = require('mongoose');
const { Schema } = mongoose;
const batchModel = require('./batch');

const studentSchema = new Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    batch: { type: Schema.Types.ObjectId, ref: batchModel, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Placed', 'Not Placed'], default: 'Not Placed' },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;