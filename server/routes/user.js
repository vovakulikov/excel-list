const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user.js');

router.post('/register',userController.registerUser);
router.post('/auth', userController.authUser);
router.get('/profile',passport.authenticate('jwt', {session:false}),userController.getProfile);
module.exports = router;
