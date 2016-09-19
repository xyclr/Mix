/**
 * Created by Alex on 16/9/10.
 */

var sha1 = require('sha1');
var Wechat = require('./wechat');
var getRawBody = require('raw-body');
var util = require('./util');

module.exports = function(opts, handler){

    var wechat = new Wechat(opts);

    return function *(next){

        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);

        var that = this;

        if(this.method === 'GET') {
            console.info('微信服务器发起GET请求 校验签名')
            if(sha === signature) {
                this.body = echostr + '';
                console.info('校验签名成功')
            } else {
                this.body = 'wrong';
                console.info('校验签名失败')
            }
        } else if(this.method === 'POST') {
            console.info('微信服务器发起POST请求');
            if(sha !== signature) {
                console.info('校验签名失败')
                this.body = 'wrong';
                return false;
            }
            console.info('校验签名成功')
            var data = yield  getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            });

            var content = yield util.pareseXMLAsync(data);

            var message = util.formatMessage(content.xml);

            this.weixin = message;

            yield handler.call(this, next);

            //外层业务逻辑处理完之后,真正的回复消息
            wechat.reply.call(this);
        }
    }
}