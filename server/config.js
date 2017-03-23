/**
 * Created by Vova on 21.03.2017.
 */
const multer = require('multer')

const config = {
  _distPath: './server/storeFiles/',
  firebaseConfig: {
    apiKey: 'AIzaSyArx5L61a2Jkho2kxrYNpLCjS2L1FAiOr8',
    authDomain: 'excel-list.firebaseapp.com',
    databaseURL: 'https://excel-list.firebaseio.com',
    storageBucket: 'excel-list.appspot.com',
    messagingSenderId: '404882626777'
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config._distPath)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
}

exports.config = config
