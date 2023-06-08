const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'views', 'shop.html');

router.get('/', (req, res, next) => {
    res.sendFile(filePath);
});

module.exports = router;