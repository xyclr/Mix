var fs = require('fs');
var conf = require('./m.js');
console.dir(conf.init());
fs.readFile('./conf.json',function(err,data){
  if(err) throw err;
  var jsonObj = JSON.parse(data);
  jsonObj.webname = "x2222xxxxx";
  fs.writeFile('./resut.json',JSON.stringify(jsonObj),function(err){
    if(err) throw err;
    console.log('has finished');
  });
});