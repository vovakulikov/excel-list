
module.exports = function(io){

  const express = require('express');
  const router = express.Router();
  const passport = require('passport');
  const multer = require('multer');
  const multerStorge = require('../multer.config.js').config;
  const upload = multer({ storage: multerStorge.storage });
  const userController = require('../controllers/user.js')(io);




  router.post('/register',userController.registerUser);
  router.post('/auth', userController.authUser);

//not auth req;
  router.use((req,res,next) => {
    if (req.get('Authorization')){
      next();
    } else {
      res.json({msg:'You are not auth user'})
    }
  });

  router.use(passport.authenticate('jwt', {session:false}));

  router.get('/profile',userController.getProfile);
  router.get('/docs',userController.getDocs);
  router.get('/download-user-file/:id', userController.download);
  router.post('/upload-user-file',upload.array('uploads'),userController.uploadFile);
  return router;
}
