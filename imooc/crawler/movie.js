'use strict'

var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');

//http.createServer(function(req, res){
//
//
//}).listen(3000, function(){
//    console.info('listen 3000');
//});

function filterPage(html, type) {
    var $ = cheerio.load(html);
    var $item = $('#iml li');
    var data ={};
    data[type] = [];

    $item.each(function() {
        var me = $(this);
        data[type].push({
            title: me.find('a').eq(1).text(),
            date: me.find('span').text(),
            thumbUrl: me.find('img').attr('src'),
            url: me.find('a').eq(0).attr('href')
        })
    });

    return data;
}

function getPageAsync(url, type) {
    return new Promise(function(resolve, reject){

        console.log('正在爬取页面:' + url);
        http.get(url, function(req, res){
            var html = '';

            req.on('data', function(data){
                html += data;
            })
            req.on('end', function(){
                console.log('爬取页面:' + url + '结束');
                resolve({
                    html: html,
                    type:type,
                });
            })
        }).on('error', function(e){
            reject(e);
            console.log('获取页面出错');
        })
    })
}

Promise
    .all([getPageAsync('http://www.piaohua.com/html/dianying.html', 'movie'), getPageAsync('http://piaohua.com/html/lianxuju/index.html', 'lxj')])
    .then(function(data){
        data.forEach(function(item){
            console.log(filterPage(item.html, item.type));
        })
    })

