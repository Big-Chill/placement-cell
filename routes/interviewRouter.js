const path = require('path');
const express = require('express');
const router = express.Router();
const interviewController = require(path.join(__dirname, '..', 'controller', 'interviewController'));

router.get('/', interviewController.getInterviews);
router.post('/addInterview', interviewController.addInterview);

module.exports = router;