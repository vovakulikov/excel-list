const config = require('./config.js').config;
const firebase = require('firebase');

class Firebase {
  constructor (config) {
    this.fb = firebase.initializeApp(config);
    this.rootRef = this.fb.database().ref();
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
    return this.fb.database().ref('list/'+username).once('child')
      .then(function (snapshot) {
        console.log('sdf',snapshot.val())
        return Promise.resolve(snapshot.val());
      })
  }
  updateDocumentUser(username,document){
    this.fb.database().ref(`users/${username.hashCode()}/documents/${document.fileName.hashCode()}`).set(document);
  }
  getUserByUsername_2(username){
    return new Promise((resolve, reject) => {
      this.rootRef.child('users').orderByChild('username')
        .equalTo(username).once('value')
        .then((snapshot) => {
          let userProfile = snapshot.val();
          console.log(userProfile)
          if(!userProfile) reject(new Error('User with this username is not exist'))
          else{
            let keyUser = Object.keys(userProfile);
            resolve(userProfile[keyUser[0]])
          }

        })
    });
  }

  addUser_2(user){
    var userRef = this.rootRef.child('users');
    var newUserRef = userRef.push();

    return newUserRef.set(user);
  }
  addUser_3(user){
    return this.fb.database().ref(`users/${user.username.hashCode()}`).set(user);
  }


  addUser(user){
    const newPostKey = user['username'];
    console.log(newPostKey)
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
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
module.exports = new Firebase(config.firebaseConfig);
