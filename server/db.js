var config = require('./config.js').config;
var firebase = require('firebase');
//firebase.initializeApp(config.firebaseConfig);

class fb{
  constructor(config){
    this.fb = firebase.initializeApp(config);
  }

  getData(url){
    return this.fb.database().ref(url).once('value')
      .then(function(snapshot){
        var list = [];
        snapshot.forEach(function(item){
          list.push(item.val())
        })
        return Promise.resolve(list);
      })
  }
  addData(data){
    var newPostKey = this.fb.database().ref().push().key;
    return new Promise((resolve,reject)=>{
        this.fb.database().ref('list/'+newPostKey).set(data)
        .then(()=>{
          resolve()
        });
    })
  }
  update(url,data){
    let updates = {};
    updates[url] = data;
    return this.fb.database().ref().update(updates);
  }
  deleteData(url){
    update(url,null);
  }
}

let fire = new fb(config.firebaseConfig);
module.exports = fire;

