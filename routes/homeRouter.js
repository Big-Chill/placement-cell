const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        titles: ['Students', 'Batches', 'Companies', 'Interviews', 'Courses'],
        routes: ['students', 'batches', 'companies', 'interviews', 'courses']
    }
    );
});

module.exports = router;