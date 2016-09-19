/**
 * Created by Alex on 16/9/11.
 */
'use strict';

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('../lib/util');
var util2 = require('./util');
var fs = require('fs');


// 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET'
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    accessToken : prefix + 'token?grant_type=client_credential',
    temporary: {
        upload: prefix + 'media/upload?'
    },
    permanent: {
        upload:  prefix + 'material/add_material?',
        uploadNews:  prefix + 'material/add_news?',
        uploadNewsPic:  prefix + 'media/uploadimg?',
    },
    ticket: {
        get : prefix + 'ticket/getticket?'
    }

};

function Wechat(opts){
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.wechatFile = opts.wechatFile;
    this.wechatTicketFile = opts.wechatTicketFile;

    this.fetchAccessToken();
}


Wechat.prototype = {

    init: function(){

    },

    fetchAccessToken: function(){
        var that = this;

        if(that.access_token && that.expires_in) {
            if(that.isValidAccessToken(this)) {
                console.info('合法token')
                return Promise.resolve(this);
            }
        }

        return that
            .getAccessToken()
            .then(function(data){
                try {
                    data = JSON.parse(data);
                }
                catch(e) {
                    return that.updateAccessToken();
                }

                if(that.isValidAccessToken(data)) {
                    return Promise.resolve(data);
                } else {
                    return that.updateAccessToken();
                }
            })
            .then(function(data){
                that.saveAccessToken(data);

                return Promise.resolve(data);
            })
    },

    isValidAccessToken : function(data){
        if(!data || !data.access_token || !data.expires_in) {
            return false;
        }

        var expires_in = data.expires_in;
        var now = new Date().getTime();

        return now < expires_in ? true : false;
    },

    fetchTicket: function(access_token){
        var that = this;

        this.access_token = access_token;
        return this
            .getTicket()
            .then(function(data){
                try {
                    data = JSON.parse(data);
                }
                catch(e) {
                    return that.updateTicket();
                }

                if(that.isValidTicket(data)) {
                    return Promise.resolve(data);
                } else {
                    return that.updateTicket();
                }
            })
            .then(function(data){
                that.saveTicket(data);

                return Promise.resolve(data);
            })
    },

    getTicket: function(){
        console.info('从wechat_ticket.txt读取ticket')
        return util.readFileAsnyc(this.wechatTicketFile);
    },

    saveTicket: function(data){
        data = JSON.stringify(data);
        console.info('保存ticket到ticket.txt')
        return util.writeFileAsnyc(this.wechatTicketFile, data);
    },

    isValidTicket : function(data){
        if(!data || !data.ticket || !data.expires_in) {
            return false;
        }

        var expires_in = data.expires_in;
        var now = new Date().getTime();

        return now < expires_in ? true : false;
    },

    updateTicket : function(){
        var url = api.ticket.get + '&access_token=' + this.access_token + '&type=jsapi';

        console.info('updateTicket');


        return new Promise(function(resolve, reject){
            request({url: url, json: true}).then(function(response){
                console.info('请求新ticked 地址: ' + url);
                console.info('请求新请求新ticked 返回 body:');
                console.log(response.body);
                var data = response.body;
                var now = new Date().getTime();
                var expires_in = now + (data.expires_in - 20) * 1000;

                data.expires_in = expires_in;

                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },

    updateAccessToken : function(){
        var appID = this.appID;
        var appSecret = this.appSecret;
        var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

        console.info('updateAccessToken');


        return new Promise(function(resolve, reject){
            request({url: url, json: true}).then(function(response){
                console.info('请求新access_token 地址: ' + url);
                console.info('请求新access_token body:');
                console.log(response.body);
                var data = response.body;
                var now = new Date().getTime();
                var expires_in = now + (data.expires_in - 20) * 1000;

                data.expires_in = expires_in;

                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },

    getAccessToken: function(){
        console.info('从wechat.txt读取acess_token')
        return util.readFileAsnyc(this.wechatFile);
    },

    saveAccessToken: function(data){
        data = JSON.stringify(data);
        console.info('保存acess_token到wechat.txt')
        return util.writeFileAsnyc(this.wechatFile, data);
    },

    reply: function(){
        var content = this.body;
        var message = this.weixin;

        var xml = util2.tpl(content, message);

        console.log('xml');
        console.log(xml);

        this.status = 200;
        this.type = 'application/xml';
        this.body = xml;
    },

    /**
     * 素材上传
     * @param type
     * @param filePath
     * @returns {bluebird|exports|module.exports}
     */
    uploadMaterial: function(type, filePath, permanent){
        var that = this;
        var form = {};
        var uploadUrl = api.temporary.upload;
        var form = {
            media: fs.createReadStream(filePath)
        };

        if(permanent) {
            uploadUrl = api.permanent.upload
        }

        return new Promise(function(resolve, reject){
            that
                .fetchAccessToken()
                .then(function(data){
                    var url = api.temporary.upload + 'access_token=' + data.access_token + '&type=' + type;
                    console.log('上传素材URL:' + url);
                    request({method: 'POST', url: url,  formData: form, json: true})
                        .then(function(response){

                            var _data = response.body;
                            console.log(_data);
                            if(_data) {
                                resolve(_data);
                            } else {
                                throw new Error('Upload materiral fails');
                            }
                        }).catch(function(err){
                            reject(err);
                        })


                })
        })
    }
};

module.exports = Wechat;