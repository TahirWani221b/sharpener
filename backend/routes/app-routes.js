const express = require('express');
const app = express();
const router = express.Router();
const user = require('../controllers/controller-user');

router.post('/user/signup/', user.signup);
router.post('/user/login/', user.login);

module.exports = router;