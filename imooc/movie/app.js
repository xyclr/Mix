'use strict';

var Koa = require('koa');
var wechat = require('./wechat/g');
var Wechat = require('./wechat/wechat');
var config = require('./config');
var weixin = require('./weixin');

var ejs = require('ejs');
var heredoc = require('heredoc');
var crypto = require('crypto');


var app = new Koa();

var tpl = heredoc(function(){/*
<!DOCTYPE html>
<html>
    <head>
        <title>猜电影</title>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1">
    </head>
    <body>
        <h3>点击标题,开始录音</h3>
        <p id="title"></p>
        <div id="poster">

        </div>
        <script src="//cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
        <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script>
         wx.config({
             debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
             appId: 'wx77d674e0c181a0c7', // 必填，公众号的唯一标识
             timestamp: <%= timestamp %> , // 必填，生成签名的时间戳
             nonceStr: <%= noncestr %>, // 必填，生成签名的随机串
             signature: <%= signature %>,// 必填，签名，见附录1
             jsApiList: [
                startRecord,
                stopRecord
             ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
         });
        </script>
    </body>
</html>
*/});

function createNonce(){
    return Math.random().toString(36).substr(2,15) + '';
}

function createTimestamp(){
    return parseInt(new Date().getTime() / 1000, 10) + '';
}

function sign(ticket, url){
    var noncestr = createNonce();
    var timestamp = createTimestamp();

    var _sign = function (noncestr, ticket, timestamp, url){
        var params = [
            'noncestr=' + noncestr,
            'jsapi_ticket=' + ticket,
            'timestamp=' + timestamp,
            'url=' + url,
        ];

        var str = params.sort().join('&');
        var shasum = crypto.createHash('sha1');
        shasum.update(str);
        return shasum.digest('hex') + '';
    };



    return {
        noncestr: noncestr,
        timestamp: timestamp,
        signature: _sign(noncestr, ticket, timestamp, url)
    }
}

app.use(function* (next){
    if(this.url.indexOf('/movie') > -1) {
        var wechatApi = new Wechat(config.wechat);
        var data = yield wechatApi.fetchAccessToken();
        var access_token = data.access_token;
        var tickData = yield wechatApi.fetchTicket(access_token);
        var ticket = tickData.ticket;
        var url = this.href;
        var params = sign(ticket, url);

        console.log(params);
        this.body = ejs.render(tpl, params);

        return next;
    }

    yield next
})

app.use(wechat(config.wechat, weixin.reply));

app.listen(1234 ,function(){
    console.log('listen on the port 1234')
});