const path = require('path');
const batchModel = require(path.join(__dirname, '..', 'model', 'batch'));
const studentModel = require(path.join(__dirname, '..', 'model', 'student'));

// GET -> /allBatches
const getAllBatches = async (req, res) => {
    try {
        const batches = await batchModel.find();
        const batchData = await Promise.all(batches.map(async (batch) => {
            const students = await studentModel.find({ batch: batch._id });
            return {
                batch: batch,
                studentCount: students.length
            }
        }));
        res.render('batch', { batches: batchData });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// POST -> /addBatch

const addBatch = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all the details',
        });
    }

    try {
        const batch = await batchModel.create({
            name,
        });
        await batch.save();
        const batches = await batchModel.find();
        res.render('batch', { batches: batches });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

// GET -> /batch/:id
const getBatchById = async (req, res) => {
    try {
        const batch = await batchModel.findById(req.params.id);
        const students = await studentModel.find({ batch: batch._id });
        res.render('batchDetail', { batch: batch, students: students });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};


module.exports = {
    getAllBatches,
    addBatch,
    getBatchById,
};