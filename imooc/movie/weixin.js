'use strict';

var util = require('./lib/util.js');
var path = require('path');
var wechat = require('./wechat/wechat');
var config = require('./config');

var wechatApi = new wechat(config.wechat);

exports.reply = function* (next){
    var message = this.weixin;

    console.log(message);

    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe') {
            if (message.EventKey) {
                console.info('扫描二维码关注' + message.EventKey + ' ' + message.
                        Ticket)
            }
            this.body = '你订阅了这个公众号';
        } else if(message.Event === 'unsubscribe') {
            console.info('取消关注');
            this.body = '';
        } else if(message.MsgType === 'LOCATION') {
            this.body = '您上报的位置是: ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
        } else if(message.MsgType === 'CLICK'){
            this.body = '您点击了菜单' + message.EventKey;
        } else if(message.MsgType === 'SCAN'){
            this.body = '扫描:' + message.EventKey + message.Ticket;
        } else if(message.MsgType === 'VIEW') {
          this.body = 'your click the link of menu:' + message.Event.Key;
        }
        this.body = '扫描:' + message.EventKey + message.Ticket;

    } else if(message.MsgType === 'text') {
        var content = message.Content;
        var reply = '额, 您说的 ' + content + ' 太复杂了';


        if(content === '1') {
            reply = '天下第一'
        } else if (content === '2') {
            reply = '天下第二'
        } else if (content === '3') {
            reply = [
                {
                    title: 'title1',
                    description: 'descriptor',
                    picUrl: 'http://pic28.nipic.com/20130424/10679686_093946442141_2.jpg',
                    url: 'http://www.baidu.com'
                },
                {
                    title: 'title2',
                    description: 'descriptor',
                    picUrl: 'http://pic14.nipic.com/20110610/7181928_110502231129_2.jpg',
                    url: 'http://www.baidu.com'
                }
            ]
        } else if (content === '4') {
            var data = yield wechatApi.uploadMaterial('image', __dirname + '/radio2-normal.png');

            reply = {
                type: 'image',
                media_id: data.media_id
            }
        }

        this.body = reply;

    }

    yield next;
}