const path = require('path');
const express = require('express');
const router = express.Router();
const batchController = require(path.join(__dirname, '..', 'controller', 'batchController'));

router.get('/', batchController.getAllBatches);
router.get('/batch/:id', batchController.getBatchById)
router.post('/addBatch', batchController.addBatch);

module.exports = router;