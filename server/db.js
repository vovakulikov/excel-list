const config = require('./config.js').config;
const firebase = require('firebase');

class Firebase {
  constructor (config) {
    this.fb = firebase.initializeApp(config);
  }

  getData (url) {
    return this.fb.database().ref(url).once('value')
      .then(function (snapshot) {
        const list = [];

        snapshot.forEach(function (item) {
          list.push(item.val())
        });
        return Promise.resolve(list)
      })
  }
  getUserByUsername(username){
    console.log('From db.js',username);
    return this.fb.database().ref('list/'+username).once('value')
      .then(function (snapshot) {
        console.log('sdf',snapshot.val())
        return Promise.resolve(snapshot.val());
      })
  }
  addUser(user){
    const newPostKey = user['username'];
    return new Promise((resolve, reject) => {
      this.fb.database().ref('list/' + newPostKey).set(user)
        .then(() => {
          resolve();
        },() => {
          reject(user);
        });
    });
  }
  addData (data) {
    const newPostKey = this.fb.database().ref().push().key;

    return new Promise((resolve, reject) => {
      this.fb.database().ref('list/' + newPostKey).set(data)
        .then(() => {
          resolve();
        },() => {
          reject(data);
        });
    });
  }

}

module.exports = new Firebase(config.firebaseConfig);
