const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.post('/view', customerController.view);

module.exports = router;
