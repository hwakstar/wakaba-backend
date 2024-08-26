const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


//user
router.post('/register', authController.register); 
router.post('/login', authController.login);
router.post('/forgot-password',authController.forgetpassword);
router.post('/reset-password/:token',authController.resetpassword);
router.post('/logintimecard', authController.logintimecard); 
router.post('/logouttimecard', authController.logouttimecard);

//admin
// router.post('/admin/login', authController.adminlogin);
module.exports = router;
