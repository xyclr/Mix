'use strict'

var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var gbk = require('gbk');

var request = Promise.promisify(require('request'));
var utils = require('./lib/utils');
var config = require('./config');




function filterPage(html, title, type) {

    var $ = cheerio.load(html);
    var $item = $(".b-all-content li");
    var data ={};
    data[type] = [];


    $item.each(function() {

        var me = $(this).find('a').eq(0);
        var title = me.attr('title');
        var thumbUrl = me.find('img').attr('src');
        var url = me.attr('href');
        var id = url.split('book_')[1].split('.')[0];
        data[type].push({
            title: title,
            thumbUrl: thumbUrl,
            url: url,
            id: id
        })
    });
    return data;
}

function getPageAsync(url, title, id) {
    var html;
    var title = title;
    var id = id;
    var url = url;


    var options = {
        hostname: 'www.quanshu.net',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
        }
    };

    return new Promise(function(resolve, reject){

        http.get(url, function(res) {
            var chunks = [];
            res.on('data', function(chunk) {
                chunks.push(chunk);
            });
            res.on('end', function() {
                html = iconv.decode(Buffer.concat(chunks), 'GBK');
                resolve({
                    html:  html,
                    title: title,
                    id: id,
                    url: url
                });
            });
        }).on('error', function(e){
            reject(e);
        });
    })
}

function getFectionByOne(url, title, id){
    return getPageAsync(url, title, id)
        .then(function(data){
            //获取小说页面,并创建小说id对应的目录
            var $ = cheerio.load(data.html);
            var url = $(".reader").attr('href') + '/';
            var title = data.title;
            var id = data.id;
            utils.mkdir('./data/' + id);
            return getPageAsync(url, title, id);
        }).then(function(data){
            //获取所有章节
            var $ = cheerio.load(data.html);
            var $lis = $('.chapterNum li');
            var chaptersArr = [];
            var prefix = data.url;

            $lis.each(function(i){
                var me = $(this);
                var url = prefix + me.find('a').attr('href');
                var title = me.find('a').text();
                var id = i;
                if(i === 10) return false;
                chaptersArr.push(getPageAsync(url, title, id));
                console.info(url);
            });

            Promise
                .all(chaptersArr)
                .then(function(data){
                    data.forEach(function(item){
                        var $ = cheerio.load(item.html);
                        var title = item.title;
                        var id = item.id;
                        var fectionId;

                        if($('.article_title').length > 0) {
                            fectionId = $('.article_title').attr('href').split('/book_')[1].split('.')[0];
                        }

                        utils.writeFileAsnyc('data/' + fectionId + '/' +  item.id + '.json', JSON.stringify({
                            html: $('#content').text(),
                            title: title,
                            id: id
                        }))
                    })
                })
        })
}

getPageAsync('http://www.quanshu.net/', 'index', '-1')
    .then(function(data){
        var title = data.title;
        var html = data.html;
        var json = filterPage(html, title,'index');

        var urls = [];
        json.index.forEach(function(item) {
            urls.push(getFectionByOne(item.url, item.title, item.id));
        });

        Promise
            .all(urls)
            .then(function(data){
                console.log(data.length);
                //utils.writeFileAsnyc(config.path.fections, jsonObj);
            })

    }).then(function(data){
        console.log('done')
    });

