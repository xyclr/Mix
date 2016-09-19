/**
 * Created by cdgoujianjun on 2015/4/21.
 */
var mongoose = require('./db');


var sysSchema = new mongoose.Schema({
    name: String,
    settings : {}
}, {
    collection: 'sys'
});

var sysModel = mongoose.model('Sys', sysSchema);

function Sys(name,cfg_obj) {
    this.name = name,
    this.cfg_obj = cfg_obj
}

module.exports = Sys;

//网站初始化配置信息
Sys.initCfg = [
    ["cfg_siteName","网站名称","默认网站","str"],
    ["cfg_basehost","网址","http://localhost/","str"],
    ["cfg_description","描述信息","默认描述","str"],
    ["cfg_keyword","关键字","默认关键字","str"],
    ["cfg_beian","备案号","默认备案号","str"],
    ["cfg_tel","电话","13438956672","str"],
    ["cfg_email","邮箱","xyclr@163.com","str"],
    ["cfg_addr","地址","默认地址","str"],
    ["cfg_qq","QQ号码","178304593","str"],
    ["cfg_logo","logo地址","https://ss0.bdstatic.com/5a21bjqh_Q23odCf/static/superplus/img/logo_white_ee663702.png","str"]
];

Sys.prototype.save = function(callback){
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    //要存入数据库的文档
    var sys = {
        name : this.name,
        settings: this.cfg_obj,
        time: time
    };

    var newSys = new sysModel(sys);
    //打开数据库
    newSys.save(function (err, doc) {
        if (err) {
            return callback(err);
        }
        callback(null, doc);
    });
};

Sys.update = function (name, setting,callback) {

    sysModel.update({
        "name": name
    },{
        $set: {"settings" : setting}
    }, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null, doc);//返回查询的一篇文章
        }
    });
};



Sys.get = function(name, callback) {

    sysModel.findOne({
        name: name
    }, function (err, doc) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        }
        callback(null, doc);//成功！返回查询的用户信息
    });

};

