'use strict'

var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var gbk = require('gbk');
var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
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
        var cat = $(this).find('a').eq(2).text();
        var author = $(this).find('a').eq(3).text();
        var id = url.split('book_')[1].split('.')[0];
        data[type].push({
            title: title,
            thumbUrl: thumbUrl,
            url: url,
            cat: cat,
            author: author,
            id: id
        })
    });
    return data;
}

function getPageAsync(url, title, id, info) {
    var html = '';
    var title = title;
    var id = id;
    var url = url;
    var info = info || '';


    return new Promise(function(resolve, reject){


        //http.get(url, function(res) {
        //    var chunks = [];
        //    res.on('data', function(chunk) {
        //        chunks.push(chunk);
        //    });
        //    res.on('end', function() {
        //        html = iconv.decode(Buffer.concat(chunks), 'GBK');
        //        resolve({
        //            html:  html,
        //            title: title,
        //            id: id,
        //            url: url,
        //            info: info
        //        });
        //    });
        //}).on('error', function(e){
        //    reject(e);
        //});

        superagent
            .get(url)
            .charset('gbk')
            .end(function (err, res) {
                if (err) {
                    reject(err);
                    console.log(err);
                    return false;
                }

                html = res.text;


                resolve({
                    html:  html,
                    title: title,
                    id: id,
                    url: url,
                    info: info
                });
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
            var info = {
                intro: $("#waa").text(),
                title: $('.b-info h1').text(),
                id:id,
                author: $('.bookso a').text(),
            };
            utils.mkdir('./data/' + id);
            return getPageAsync(url, title, id, info);
        }).then(function(data){
            //console.log(data);
            //获取所有章节
            var $ = cheerio.load(data.html);
            var $lis = $('.chapterNum li');
            var chaptersArr = [];
            var fection = {};
            fection.info = data.info;
            fection.chapters = [];
            var prefix = data.url;


            $lis.each(function(i){
                var me = $(this);
                var url = prefix + me.find('a').attr('href');
                var title = me.find('a').text();
                var id = i;
                if(id==20) return false;
                fection.chapters.push({
                    url: url,
                    title: title,
                    id: id
                });
                chaptersArr.push(getPageAsync(url, title, id));
            });

            Promise
                .all(chaptersArr)
                .then(function(data){
                    data.forEach(function(item){
                        var $ = cheerio.load(item.html);
                        var title = item.title;
                        var id = item.id;
                        var fectionId;

                        fectionId = $('.article_title').attr('href').split('/book_')[1].split('.')[0];

                        utils.writeFileAsnyc('data/' + fectionId + '/'+ 'info.json', JSON.stringify(fection));

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
        var fections = [];
        var urls = [];
        json.index.forEach(function(item) {
            urls.push(getFectionByOne(item.url, item.title, item.id));
            fections.push({
                url: item.url,
                title: item.title,
                id: item.id,
                cat: item.cat,
                author: item.author,
                thumbUrl: item.thumbUrl
            })
        });

        Promise
            .all(urls)
            .then(function(data){

                utils.writeFileAsnyc('data/fections.json', JSON.stringify(fections));
                //utils.writeFileAsnyc(config.path.fections, jsonObj);
            })

    }).then(function(data){
        console.log('done')
    });

