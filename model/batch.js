const mongoose = require('mongoose');
const { Schema } = mongoose;

const batchSchema = new Schema({
    name: { type: String, required: true, unique: true },
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;