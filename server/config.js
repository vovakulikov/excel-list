const config = {
  _distPath: './server/storeFiles/',
  firebaseConfig: {
    apiKey: 'AIzaSyArx5L61a2Jkho2kxrYNpLCjS2L1FAiOr8',
    authDomain: 'excel-list.firebaseapp.com',
    databaseURL: 'https://excel-list.firebaseio.com',
    storageBucket: 'excel-list.appspot.com',
    messagingSenderId: '404882626777'
  },
  fieldForTotal: 'Money',
  //todo: в конфиге не должно быть функций, только константы, попробуй вынести
  //solution: create a single module for 'multer' config
};

exports.config = config;
