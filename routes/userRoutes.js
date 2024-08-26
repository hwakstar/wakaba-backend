const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/profile', userController.createPofile); 
router.post('/delete', userController.deleteUser);

module.exports = router;
