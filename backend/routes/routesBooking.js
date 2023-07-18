const express = require('express');
const app = express();
const router = express.Router();
const bookingControllers = require('../controllers/bookingControllers');

router.post('/booking-form/', bookingControllers.submitData);
router.get('/get-data/', bookingControllers.getData);
router.post('/delete-data/', bookingControllers.deleteData);

module.exports = router;