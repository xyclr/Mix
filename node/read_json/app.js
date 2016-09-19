var fs = require('fs');
fs.readFile('./json.json',function(err,data){
  if(err) throw err;


  var jsonObj = JSON.parse(data);
  var space = ' ';
  var newLine = '\n';
  var chunks = [];
  var length = 0;

  for(var i=0,size=jsonObj.length;i<size;i++){
    var one = jsonObj[i];
    console.info(i);
    console.info(one);
    //what value you want
    var value1 = one['webname'];
    //var value = value1 +space+value2+space+newLine;
    var value = value1;
    var buffer = new Buffer(value);
    chunks.push(buffer);
    length += buffer.length;
  }

  var resultBuffer = new Buffer(length);
  console.info(chunks);
  for(var i=0,size=chunks.length,pos=0;i<size;i++){
    chunks[i].copy(resultBuffer,pos);
    pos += chunks[i].length;
  }

  fs.writeFile('./resut.text',resultBuffer,function(err){
    if(err) throw err;
    console.log('has finished');
  });

});