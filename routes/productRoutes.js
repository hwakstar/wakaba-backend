const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/view', productController.view); 

module.exports = router;
