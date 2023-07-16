const path = require('path');
const express = require('express');
const router = express.Router();
const studentController = require(path.join(__dirname, '..', 'controller', 'studentController'));

router.get('/', studentController.getAllStudents);
router.get('/getStudent/:id', studentController.getStudent);
router.post('/addStudent', studentController.addStudent);
router.post('/addCourseScore/:id', studentController.addCourseScore);
router.post('/updateStudentStatus/:id', studentController.updateStudentStatus);

module.exports = router;