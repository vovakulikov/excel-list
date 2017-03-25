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

  addData (data) {
    const newPostKey = this.fb.database().ref().push().key;

    return new Promise((resolve, reject) => {
      //todo: never rejected? what if fb.database.red ddailed to set data? add catch and reject
      //solution: add a reject, and add a catch block, but not here. Catch is in controller/excel.js
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
