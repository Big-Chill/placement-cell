const path = require('path');
const studentModel = require(path.join(__dirname, '..', 'model', 'student'));
const batchModel = require(path.join(__dirname, '..', 'model', 'batch'));
const interviewModel = require(path.join(__dirname, '..', 'model', 'interview'));
const courseModel = require(path.join(__dirname, '..', 'model', 'course'));
const courseScoreModel = require(path.join(__dirname, '..', 'model', 'courseScore'));


// GET -> /allStudents
const getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.find().populate('batch');
        const batches = await batchModel.find();
        res.render('student', { students : students, batches : batches });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};



// POST -> /addStudent
const addStudent = async (req, res) => {
    const { name, college, batch, email, phone, status } = req.body;

    if (!name || !college || !batch || !email || !phone || !status) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the details',
        });
    }

    try {
        const batchObj = await batchModel.findById(batch);
        if (!batchObj) {
            return res.status(400).json({
                status: 'fail',
                message: 'Batch not found',
            });
        }
        const student = await studentModel.create({
            name,
            college,
            batch: batchObj._id,
            email,
            phone,
            status,
        });
        
        await student.save();
        const allStudents = await studentModel.find().populate('batch');
        const batches = await batchModel.find();
        res.render('student', { students : allStudents, batches : batches });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};


// GET -> /getStudent/:id
const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await studentModel.findById(id);
        const getBatch = await batchModel.findById(student.batch);
        const courseScores = await courseScoreModel.find({ student: id }).populate('course');
        const allCourses = await courseModel.find();
        const interviews = await interviewModel.find({ student: id }).populate('company');
        console.log(courseScores);
        res.render('studentDetail', { student : student, batch : getBatch, courseScores : courseScores, courses : allCourses, interviews : interviews});
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};


// POST -> /addCourseScore/:id
const addCourseScore = async (req, res) => {
    const { id } = req.params;
    const { course, score } = req.body;

    if (!course || !score) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the details',
        });
    }

    try {
        const courseObj = await courseModel.findById(course);
        if (!courseObj) {
            return res.status(400).json({
                status: 'fail',
                message: 'Course not found',
            });
        }
        const student = await studentModel.findById(id);
        if (!student) {
            return res.status(400).json({
                status: 'fail',
                message: 'Student not found',
            });
        }
        // Check if the student has already given the score for the course
        const courseScoreObj = await courseScoreModel.findOne({ student: id, course: courseObj._id });
        if (courseScoreObj) {
            return res.status(400).json({
                status: 'fail',
                message: 'Student has already given the score for the course',
            });
        }
        const courseScore = await courseScoreModel.create({
            student: student._id,
            course: courseObj._id,
            score,
        });
        
        await courseScore.save();
        const getBatch = await batchModel.findById(student.batch);
        const courseScores = await courseScoreModel.find({ student: id }).populate('course');
        const allCourses = await courseModel.find();
        const interviews = await interviewModel.find({ student: id }).populate('company');
        res.render('studentDetail', { student : student, batch : getBatch, courseScores : courseScores, courses : allCourses, interviews : interviews});
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};


// PUT -> /updateStudentStatus/:id
const updateStudentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the details',
        });
    }

    try {
        let new_status = '';
        if (status === 'placed') {
            new_status = 'Placed';
        } else if (status === 'not placed') {
            new_status = 'Not Placed';
        }
        const student = await studentModel.findByIdAndUpdate(id, { status: new_status }, { new: true });
        const getBatch = await batchModel.findById(student.batch);
        const courseScores = await courseScoreModel.find({ student: id }).populate('course');
        const allCourses = await courseModel.find();
        const interviews = await interviewModel.find({ student: id }).populate('company');
        res.render('studentDetail', { student : student, batch : getBatch, courseScores : courseScores, courses : allCourses, interviews : interviews});
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};


module.exports = {
    getAllStudents,
    addStudent,
    getStudent,
    addCourseScore,
    updateStudentStatus,
};