const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');
const filePath = path.join(rootDir, 'views', 'admin.html');

router.get('/add-product', (req, res, next) => {
    res.sendFile(filePath);
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body.title);
    res.redirect('/');
});

module.exports = router; 