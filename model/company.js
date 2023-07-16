const mongoose = require('mongoose');
const { Schema } = mongoose;


const companySchema = new Schema({
    name: { type: String, required: true, unique: true },
});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;