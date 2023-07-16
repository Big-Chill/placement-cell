const path = require('path');
const courseModel = require(path.join(__dirname, '..', 'model', 'course'));

// GET -> /courses/

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.render('course', { courses : courses });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};


// POST -> /addCourse
const addCourse = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the details',
        });
    }
    try {
        const course = await courseModel.create({
            name,
        });
        await course.save();
        const allCourses = await courseModel.find();
        res.render('course', { courses : allCourses });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};


module.exports = {
    getAllCourses,
    addCourse,
};