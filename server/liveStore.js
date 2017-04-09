const clients ={};

exports.subcribe = function (req, res){
  clients[req.user.email] =  clients[req.user.email] || [];
  clients[req.user.email].push(res);
  res.on('close',function(){
    clients[req.user.email].splice(clients[req.user.email].indexOf(res),1);
  });
}

exports.publish = function (req, documentsInfo) {
  clients[req.user.email].forEach((res) => {
    res.json(documentsInfo);
  });
  clients[req.user.email] = [];
}

setInterval(function(){
  if(clients['vovakulikov@icloud.com'])  console.log(clients['vovakulikov@icloud.com'].length);
},2000)
