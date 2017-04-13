const clients = {};

exports.subcribe = function (req, res){
  clients[req.user.email] = clients[req.user.email] || [];
  clients[req.user.email].push(res);
  res.on('close',function(){
    clients[req.user.email].splice(clients[req.user.email].indexOf(res), 1);
  });
};

exports.publish = function (req, documentsInfo) {
  console.log(clients[req.user.email].length)
  clients[req.user.email].forEach((res) => {
    res.json(documentsInfo);
  });
  clients[req.user.email] = [];
};

setInterval(()=>{
  Object.keys(clients).forEach(function (key) {
    console.log(key, clients[key].length);
})
  //console.log(clients);
},2000)
