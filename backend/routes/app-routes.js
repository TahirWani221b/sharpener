const express = require('express');
const app = express();
const router = express.Router();
const user = require('../controllers/controller-user');

router.post('/user/signup/', user.signup);

module.exports = router;