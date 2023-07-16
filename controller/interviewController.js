const path = require('path');
const interviewModel = require(path.join(__dirname, '..', 'model', 'interview'));
const studentModel = require(path.join(__dirname, '..', 'model', 'student'));
const companyModel = require(path.join(__dirname, '..', 'model', 'company'));


// GET /interviews
const getInterviews = async (req, res) => {
    try {
        const interviews = await interviewModel.find().populate('student').populate('company');
        const students = await studentModel.find();
        const companies = await companyModel.find();
        res.render('interview', { interviews: interviews, students: students, companies: companies });
    } catch (
        err) {
        res.status(400).json({ message: err.message });
    }
};

// POST /interviews/addInterview
const addInterview = async (req, res) => {
    const { student, company, date } = req.body;
    try {
        // Need to check if interview already exists

        const interview = await interviewModel.findOne({ student: student, company: company});
        if (interview) {
            res.status(400).json({ message: 'Interview already exists' });
            return;
        }

        const studentObj = await studentModel.findById(student);
        const companyObj = await companyModel.findById(company);
        const interviewObj = await interviewModel.create({ student: studentObj._id, company: companyObj._id, date: date, result: 'Not Atempted' });
        await interviewObj.save();
        const interviews = await interviewModel.find().populate('student').populate('company');
        const students = await studentModel.find();
        const companies = await companyModel.find();

        res.render('interview', { interviews: interviews, students: students, companies: companies });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
    getInterviews,
    addInterview
};