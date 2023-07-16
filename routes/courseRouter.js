const path = require('path');
const express = require('express');
const router = express.Router();
const courseController = require(path.join(__dirname, '..', 'controller', 'courseController'));

router.get('/', courseController.getAllCourses);
router.post('/addCourse', courseController.addCourse);

module.exports = router;