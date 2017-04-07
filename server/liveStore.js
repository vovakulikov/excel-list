const clients ={};

exports.subcribe = function (req, res){
  clients[req.user.email] =  clients[req.user.email] || [];
  clients[req.user.email].push(res);
}

exports.publish = function (req, documentsInfo) {
  clients[req.user.email].forEach((res) => {
    res.json(documentsInfo);
  });

  clients[req.user.email] = [];
}
