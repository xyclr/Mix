'use strict';

var util = require('./lib/util.js');
var path = require('path');

var config = {
    wechat: {
        appID: 'wx77d674e0c181a0c7',
        appSecret: 'c36d0456450577dffd60e784f4c5f8b9',
        token: 'weixinjk',
        wechatFile: path.join(__dirname, './config/wechat.txt'),
        wechatTicketFile: path.join(__dirname, './config/wechat_ticket.txt')
    }
}

module.exports = config;
