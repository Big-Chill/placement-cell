const path = require('path');
const companyModel = require(path.join(__dirname, '..', 'model', 'company'));
const interviewModel = require(path.join(__dirname, '..', 'model', 'interview'));

// GET -> /allCompanies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await companyModel.find();
        res.render('company', { companies: companies });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// POST -> /addCompany
const addCompany = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the details',
        });
    }

    try {
        const company = await companyModel.create({
            name,
        });
        await company.save();
        const companies = await companyModel.find();
        res.render('company', { companies: companies });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

// GET -> /getCompany/:id
const getCompanyById = async (req, res) => {
    try {
        const company = await companyModel.findById(req.params.id);
        const interviews = await interviewModel.find({ company: req.params.id }).populate('student');
        res.render('companyDetail', { company: company, interviews: interviews });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};



module.exports = {
    getAllCompanies,
    addCompany,
    getCompanyById,
};