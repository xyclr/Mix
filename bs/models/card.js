var mongoose = require('./db');
var ObjectID = require('mongodb').ObjectID;



var cardSchema = new mongoose.Schema({
    title: String,
    point : Number,
    thumb : String,
    detail: String,
    dtime: [],
    num: Number,
    price : Number,
    time : {}
}, {
    collection: 'cards'
});

var cardModel = mongoose.model('Card', cardSchema);

function Card(title,point, thumb,detail,dtime,num,price) {
    this.title = title;
    this.point = point;
    this.thumb = thumb;
    this.detail = detail;
    this.dtime = dtime;
    this.num = num;
    this.price = price;
}

module.exports = Card;

//存储一篇文章及其相关信息
Card.prototype.save = function (callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    //要存入数据库的文档
    var card = {
        title: this.title,
        point: this.point,
        thumb: this.thumb,
        detail: this.detail,
        dtime : this.dtime,
        num : this.num,
        price : this.price,
        time : time
    };

    var newCard = new cardModel(card);
    //打开数据库
    newCard.save(function (err, doc) {
        if (err) {
            return callback(err);
        }
        callback(null, doc);
    });
};

//获取一个卡券
Card.getOne = function(_id, callback) {
    cardModel.findOne({"_id": new ObjectID(_id)}, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null, doc);
        }
    });

};



//返回原始发表的内容
Card.edit = function (_id, callback) {
    cardModel.findOne({"_id": new ObjectID(_id)}, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null, doc);//返回查询的一篇文章
        }
    });
};

//更新一篇文章及其相关信息
Card.update = function (_id, title,point, thumb,detail,dtime,num,price,callback) {
    cardModel.update({
        "_id": new ObjectID(_id)
    },{
        $set: {
            "title": title,
            "point": point,
            "thumb": thumb,
            "detail": detail,
            "dtime": dtime,
            "cnum": num,
            "price": price
        }
    },{
        upsert : true
    }, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null, doc);
        }
    });

};

//删除一篇文章
Card.remove = function (_id, callback) {
    cardModel.remove({"_id": new ObjectID(_id)}, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null);
        }
    });
};

//返回所有文章存档信息
Card.getArchive = function (callback) {
    cardModel.find({},{
        "title": 1,
        "point": 1,
        "thumb": 1
    }, {},function (err, docs) {
        if (err) {
            return callback(err);
        }
        callback(null, docs);
    });
};

//返回用户信息
Card.getUser = function (callback) {
    cardModel.find({},{
        "name": 1,
        "time": 1,
        "title": 1
    }, {},function (err, docs) {
        if (err) {
            return callback(err);
        }
        callback(null, docs);
    });
};

