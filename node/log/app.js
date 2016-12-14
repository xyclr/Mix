var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var util = require('util');


// http.createServer(function(req, res){
//     var post = '';     //定义了一个post变量，用于暂存请求体的信息

//     req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
//         post += chunk;
//     });

//     req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
//         var contentText = fs.readFileSync('./log.json','utf-8');
//         fs.writeFileSync('log.json', post);
//         post = querystring.parse(post);
//         res.header("Access-Control-Allow-Origin", "*");
//         res.end(util.inspect(post));
//     });
// }).listen(3000);



var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser'); 

app.post('/log', function (req, res) {
    var post = '';     //定义了一个post变量，用于暂存请求体的信息

    req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;
    });

    req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        var contentText = fs.readFileSync('./log.json','utf-8');
        fs.writeFileSync('log.json', post);
        post = querystring.parse(post);
        res.header("Access-Control-Allow-Origin", "*");
        res.end(util.inspect(post));
    });

})

app.get('/log', function (req, res) {
    var contentText = fs.readFileSync('./log.json','utf-8');
    res.writeHead(200, {'Content-Type': 'application/json'});
    console.log(contentText);
    res.end(contentText);
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})