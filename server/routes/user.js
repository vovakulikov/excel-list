const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const multerStorge = require('../multer.config.js').config;
const upload = multer({ storage: multerStorge.storage });
const userController = require('../controllers/user.js');




router.post('/register',userController.registerUser);
router.post('/auth', userController.authUser);

router.use(passport.authenticate('jwt', {session:false}));

router.get('/profile',userController.getProfile);
router.get('/docs',userController.getDocs)
router.get('/download-user-file/:id', userController.download);
router.post('/upload-user-file',upload.array('uploads'),userController.uploadFile);


module.exports = router;
