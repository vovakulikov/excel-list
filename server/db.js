const config = require('./config/config.js').config;
const firebase = require('firebase');
const hash = require('./utils/util-hash');

class Firebase {
  constructor (config) {
    this.fb = firebase.initializeApp(config);
    this.rootRef = this.fb.database().ref();
  }

  getDocuments (url) {
    return this.fb.database().ref(url).once('value')
      .then((snapshot) => {
        const list = [];

        snapshot.forEach(function (doc) {
          list.push(doc.val());
        });
        return Promise.resolve(list);
      },(error) => {
        throw new Error(error);
      } );
  }

  getUserByUsername (email) {
    return new Promise((resolve, reject) => {
      this.rootRef.child('users').orderByChild('email')
        .equalTo(email).once('value')
        .then((snapshot) => {
          let userProfile = snapshot.val();
          if(!userProfile) {
            reject(new Error('User with this email is not exist'));
          } else {
            let keyUser = Object.keys(userProfile);
            resolve(userProfile[keyUser[0]]);
          }
        });
    });
  }

  addUser(user){
    return this.fb.database().ref(`users/${hash(user.email)}`).set(user);
  }

  removeUser(user){
    return this.fb.database().ref(`users/${hash(user.email)}`).remove()
  }

  addDocumentsToUser(user,document){
    return new Promise((resolve, reject) => {
      this.fb.database().ref(`users/${hash(user.email)}/documents/${hash(document.fileName)}`)
        .set(document)
        .then(() => {
          resolve();
        }, () => {
          reject(user);
        });
    });
  }
}

module.exports = new Firebase(config.firebaseConfig);
