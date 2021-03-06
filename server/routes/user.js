const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const multerStorge = require('../config/multer.config.js').config;
const upload = multer({storage: multerStorge.storage});
const userController = require('../controllers/user.js');

router.post('/register',userController.registerUser);
router.post('/auth', userController.authUser);
router.get('/get-share-file/:user/:fileName', userController.getShareFile);
//not auth req;
router.use((req, res, next) => {
	if (req.get('Authorization')) {
		next();
	} else {
		res.json({success: false, msg:'You are not auth user'});
	}
});

router.use(passport.authenticate('jwt', {session:false}));

router.get('/share-file/:fileName', userController.generateShareLink);
router.get('/profile',userController.getProfile);
router.get('/docs',userController.getDocs);
router.get('/subscribe-update-files', userController.subcribe);
router.get('/download-user-file/:id', userController.download);
router.post('/upload-user-file',upload.array('uploads'),userController.uploadFile);
router.delete('/delete-file/:file',userController.deleteFile);
module.exports = router;
