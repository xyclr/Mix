/**
 * Created by Alex on 16/9/10.
 */
'use strict'

var xml2js = require('xml2js');
var Promise = require('bluebird');
var tpl = require('./tpl');

function formatMessage(result){
    var message = {};

    if(typeof result === 'object') {
        var keys = Object.keys(result);

        for(var i = 0, len = keys.length; i < len; i++) {
            var item = result[keys[i]];
            var key = keys[i];

            if(!(item instanceof Array) || item.length === 0) {
                continue;
            }

            if(item.length === 1) {
                var val = item[0];
                if(typeof val === 'object' ) {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                message[key] = [];

                for(var j = 0, len = item.length; i < len; i++) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }

    return message;
}

exports.pareseXMLAsync = function(xml){
    return new Promise(function(resolve, reject){
        xml2js.parseString(xml, {trim: true}, function(err, content){
            if(err) reject(err);
            else resolve(content);
        })
    })
};

exports.formatMessage = formatMessage;

exports.tpl = function(content, msg) {
    //var info = {};
    //var type = 'text';
    //var fromUserName = msg.FromUserName;
    //var toUserName = msg.ToUserName;
    //
    //if(Array.isArray(content)) {
    //    type = 'news';
    //}
    //
    //type = content.type || type;
    //info.content = content;
    //info.createTime = new Date().getTime();
    //info.msgType = type;


    return tpl.compiled({
        content: content,
        createTime: new Date().getTime(),
        msgType: function(){
            var type = 'text';
            if(Array.isArray(content)) {
                type = 'news';
            }
            type = content.type || type;

            console.info(type);
            return type;
        }(),
        fromUserName: msg.ToUserName,
        toUserName: msg.FromUserName
    });

}

