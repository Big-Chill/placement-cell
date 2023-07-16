const path = require('path');
const express = require('express');
const router = express.Router();
const companyController = require(path.join(__dirname, '..', 'controller', 'companyController'));

router.get('/', companyController.getAllCompanies);
router.get('/getCompany/:id', companyController.getCompanyById)
router.post('/addCompany', companyController.addCompany);



module.exports = router;