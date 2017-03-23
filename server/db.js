const config = require('./config.js').config
const firebase = require('firebase')

class Firebase {
  constructor (config) {
    this.fb = firebase.initializeApp(config)
  }

  getData (url) {
    return this.fb.database().ref(url).once('value')
      .then(function (snapshot) {
        let list = []
        snapshot.forEach(function (item) {
          list.push(item.val())
        })
        return Promise.resolve(list)
      })
  }
  addData (data) {
    const newPostKey = this.fb.database().ref().push().key
    return new Promise((resolve, reject) => {
      this.fb.database().ref('list/' + newPostKey).set(data)
        .then(() => {
          resolve()
        })
    })
  }
  update (url, data) {
    let updates = { url: data }
    return this.fb.database().ref().update(updates)
  }
  deleteData (url) {
    this.update(url, null)
  }
}

module.exports = new Firebase(config.firebaseConfig)
